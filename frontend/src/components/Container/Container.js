import React from "react";
import "./Container.css";
function Container({ children }) {
  return (
    <div
      style={{
        padding: "2px",
        borderRadius: "30px",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
      }}
      id="main-container"
    >
      <div id="frosted-container">{children}</div>
    </div>
  );
}

export default Container;
