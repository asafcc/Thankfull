import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { Button, TextField } from "@material-ui/core";

import Axios from "axios";
import Popup from "../components/Popup";
import Info from "../components/Info";
import StateContext from "../Context/StateContext";
import DispatchContext from "../Context/DispatchContext";

function LoginPage({ history }) {
  const userDetails = useContext(StateContext);
  const setUserDetails = useContext(DispatchContext);

  const [errorMsg, setErrorMsg] = useState(null);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    if (userDetails) {
      // console.log(userDetails);
      history.push("/");
    }
  }, [history, userDetails]);

  const handleSubmit = async () => {
    const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailReg.test(email) || !passwordReg.test(password)) {
      if (!emailReg.test(email)) {
        setEmailError(true);
      }
      if (!passwordReg.test(password)) {
        setPasswordError(true);
      }
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await Axios.post(
        "/api/users/login",
        { email, password },
        config
      );

      localStorage.setItem("userDetailsThankfulApp", JSON.stringify(data));
      setUserDetails(data);
    } catch (error) {
      const msgText =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      setErrorMsg(msgText);
    }
  };

  return (
    <>
      {errorMsg && (
        <Popup setErrorMsg={setErrorMsg} message={`${errorMsg} 🙄`} />
      )}
      <Container>
        <Info />
        <h2
          style={{
            marginBottom: "0.5rem",
            fontWeight: 300,
            letterSpacing: "2px",
            alignSelf: "self-start",
          }}
          className="animateFromBottom"
        >
          Sign In.
        </h2>

        <TextField
          error={emailError}
          required
          type="email"
          className="animateFromBottom"
          style={{
            backgroundColor: "rgba(0, 0 , 0, 0.05)",
            width: "100%",
            marginTop: "1rem",
          }}
          label="Email"
          autoComplete="email"
          variant="outlined"
          value={email}
          onChange={(e) => {
            setEmailError(false);
            setEmail(e.target.value);
          }}
        />

        {emailError ? (
          <h5 style={{ marginTop: "0.3rem" }}>Must Be a Valid Email Address</h5>
        ) : (
          ""
        )}

        <TextField
          error={passwordError}
          required
          className="animateFromBottom"
          style={{
            backgroundColor: "rgba(0, 0 , 0, 0.05)",
            width: "100%",
            marginTop: "1rem",
          }}
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => {
            setPasswordError(false);
            setPassword(e.target.value);
          }}
          autoComplete="current-password"
        />

        {passwordError ? (
          <h5 style={{ marginTop: "0.3rem" }}>
            Minimun 8 Characters: At least One Letter And One{" "}
          </h5>
        ) : (
          ""
        )}

        <Button
          style={{
            width: "100%",
            marginTop: "1.5rem",
          }}
          disableElevation
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
        >
          Sign In
        </Button>
        <Link
          style={{
            marginTop: "1rem",
          }}
          to="/register"
        >
          <h5 className="link">Not Having An Account? Register Here.</h5>
        </Link>
      </Container>
    </>
  );
}

export default LoginPage;
