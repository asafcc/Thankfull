import React, { useEffect } from "react";
import "./Quote.css";

function Quote({ quote, setQuote, name, animationClass, time }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setQuote(null);
    }, time);
    return () => {
      clearTimeout(timer);
    };
  }, [setQuote]);

  return (
    <div className={`quote ${animationClass}`}>
      <div
        className="quote-body"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <h2
          style={{
            fontWeight: 300,
            letterSpacing: "2px",

            alignSelf: "center",
          }}
        >
          {quote}
        </h2>
        <span
          style={{
            fontStyle: "italic",
            letterSpacing: "3px",
            marginTop: "0.5rem",
            marginRight: "2rem",
            alignSelf: "flex-end",
            opacity: 0.7,
            textTransform: "uppercase",
          }}
        >
          {`- ${name}`}
        </span>
      </div>
    </div>
  );
}

export default Quote;
