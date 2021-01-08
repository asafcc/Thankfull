import React, { useEffect } from "react";
import "./Popup.css";

function Popup({ message, setErrorMsg }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg(null);
    }, 8500);
    return () => {
      clearTimeout(timer);
    };
  }, [setErrorMsg]);
  return (
    <div
      id="popup"
      style={{
        display: "flex",
        justifyContent: "center",
        position: "fixed",
        top: "0",
        left: "50%",
        borderRadius: "10px",
        backgroundColor: "white",
        padding: "1rem 4rem",
        paddingTop: "2.5rem",
        maxWidth: "27rem",
      }}
    >
      {message}
    </div>
  );
}

export default Popup;
