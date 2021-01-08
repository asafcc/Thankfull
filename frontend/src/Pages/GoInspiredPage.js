import React, { useEffect, useState } from "react";

import Popup from "../components/Popup";
import Quote from "../components/Quote";
import Axios from "axios";

function GoInspiredPage({ history }) {
  const [errorMsg, setErrorMsg] = useState(null);
  const [quotes, setQuotes] = useState(null);
  const [quote, setQuote] = useState(null);

  const [init, setInit] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await Axios.get("/api/quotes");
        console.log(data);
        setQuotes(data);
      } catch (error) {
        const msgText =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        setErrorMsg(`${msgText} 🤭`);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    let timer;
    if (quotes && quotes.length) {
      if (init) {
        const quotesTemp = [...quotes];
        setQuote(quotesTemp.pop());
        setQuotes(quotesTemp);
        setInit(false);
      } else {
        timer = setInterval(() => {
          const quotesTemp = [...quotes];
          setQuote(quotesTemp.pop());
          setQuotes(quotesTemp);
        }, 4550);
        return () => {
          return clearInterval(timer);
        };
      }
    } else if (quotes !== null && quotes.length === 0) {
      const timer = setTimeout(() => {
        setErrorMsg(
          "Thats It For Now! Add More Things That Makes You Thankfull, So Other People Can Be Inspired As Well ⭐"
        );
      }, 4750);
      return () => {
        return clearInterval(timer);
      };
    }
  }, [quotes]);

  return (
    <>
      {errorMsg && <Popup setErrorMsg={setErrorMsg} message={errorMsg} />}
      {quote && (
        <Quote
          time={4500}
          animationClass="explore"
          quote={quote.text}
          name={quote.createdBy}
          setQuote={setQuote}
        />
      )}
    </>
  );
}

export default GoInspiredPage;
