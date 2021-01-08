import React, { useState, useEffect, useContext, useRef } from "react";
import Container from "../components/Container/";
import Quote from "../components/Quote";
import Popup from "../components/Popup";
import Info from "../components/Info";
import StateContext from "../Context/StateContext";
import DispatchContext from "../Context/DispatchContext";

import { SiAddthis } from "react-icons/si";
import TextField from "@material-ui/core/TextField";
import Axios from "axios";
import { FormControlLabel, Switch, Tooltip } from "@material-ui/core";

function HomePage({ history }) {
  const userDetails = useContext(StateContext);
  const setUserDetails = useContext(DispatchContext);
  const textField = useRef(null);

  useEffect(() => {
    if (!userDetails) {
      history.push("/register");
    } else {
      async function authUser() {
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userDetails.token}`,
            },
          };

          const { data } = await Axios.post(`/api/users/auth`, {}, config);

          localStorage.setItem(
            "userDetailsThankfulApp",
            JSON.stringify({ ...userDetails, ...data })
          );
          setUserDetails({ ...userDetails, ...data });
        } catch (error) {
          localStorage.removeItem("userDetailsThankfulApp");
          setUserDetails(null);
          history.push("/login");
        }
      }
      authUser();
    }
  }, [history]);

  let name = userDetails ? userDetails.name : "";

  const [msg, setMsg] = useState(null);
  const [quote, setQuote] = useState(null);
  const [userText, setUserText] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userText.trim() && userDetails && userDetails.quotesForToday) {
      setUserDetails((prev) => {
        return { ...prev, quotesForToday: (prev.quotesForToday -= 1) };
      });
      const send = { createdBy: userDetails.name, text: userText, isPrivate };
      setUserText("");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userDetails.token}`,
        },
      };

      const { data } = await Axios.post(`/api/quotes`, send, config);

      localStorage.setItem(
        "userDetailsThankfulApp",
        JSON.stringify({
          ...userDetails,
          quotesForToday: data.userDetails.quotesForToday,
        })
      );

      if (Math.random() > 0.6) {
        const arrayMotivation = [
          "You Are Doing Great! 🤩",
          "Just 2 More To Go! ✌️",
          "That One Is Awesome! 😁",
          "Keep On Going... ⭐",
          "Love It! ❤️",
          "This One Is Really Good! 😻",
          "Agreed. 🙏",
          "Period. 👊",
          "That's Right! 💪",
          "Divine!",
          "👌",
          "YEP 😽",
          "😸",
          "😺",
          "🤗",
          "🙃",
          "😉",
          "🌟",
          "💫",
          "✨",
          "💖",
          "🙌",
          "👍",
          "👏",
          "🤟",
          "✌️",
          "🤙",
          "😎",
          "💡",
          "💕",
          "❤️",
          "Inspiring!",
        ];
        setMsg(
          arrayMotivation[Math.floor(Math.random() * arrayMotivation.length)]
        );
      }

      setQuote(data.quote.text);
      textField.current.focus();
    }
  };

  return (
    <>
      {msg && <Popup setErrorMsg={setMsg} message={msg} />}

      <Container>
        <Info />
        <h2
          style={{
            marginBottom: "0.3rem",
            fontWeight: 300,
            letterSpacing: "2px",
            alignSelf: "self-start",
            textTransform: "capitalize",
          }}
          className="animateFromBottom"
        >
          {`Hello ${name},`}
        </h2>
        <h3
          style={{
            marginBottom: "2rem",
            fontWeight: 300,
            letterSpacing: "2px",
            alignSelf: "self-start",
          }}
          className="animateFromBottom"
        >
          {userDetails && userDetails.quotesForToday
            ? "What Are You Thankful For Today?"
            : "You Are Done For Today."}
        </h3>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <TextField
            ref={textField}
            className="animateFromBottom"
            style={{
              backgroundColor: "rgba(0, 0 , 0, 0.05)",
              width: "100%",
            }}
            id="standard-required"
            variant="outlined"
            autoFocus
            autoComplete="off"
            value={
              userDetails && userDetails.quotesForToday ? userText : "Done!"
            }
            onChange={(e) => setUserText(e.target.value)}
            disabled={userDetails && !userDetails.quotesForToday}
          />
          <Tooltip
            title="It Won't Be Shared In The Go-Inspered Section"
            arrow
            placement="right"
          >
            <FormControlLabel
              // style={{ alignSelf: "flex-start" }}
              className="animateFromBottom"
              control={<Switch name="isPrivate" />}
              checked={isPrivate}
              onChange={() => setIsPrivate((prev) => !prev)}
              label="Private"
            />
          </Tooltip>
          <SiAddthis
            onClick={(e) => handleSubmit(e)}
            id="add-btn"
            style={{ color: "#b5838d", fontSize: "3rem", marginTop: "1rem" }}
            className="animateFromBottom"
          />
        </form>

        <h5
          className="animateFromBottom"
          style={{
            alignSelf: "center",
            fontWeight: 300,
            letterSpacing: "2px",
            marginTop: "1rem",
          }}
        >
          {userDetails && userDetails.quotesForToday
            ? `Just ${userDetails.quotesForToday} More Things!`
            : "Don't Forget To Come Back Tomorrow."}
        </h5>
      </Container>

      {quote && (
        <Quote
          time={2500}
          animationClass="slideToBottom"
          quote={quote}
          name={name}
          setQuote={setQuote}
        />
      )}
    </>
  );
}

export default HomePage;
