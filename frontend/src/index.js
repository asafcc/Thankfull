import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#6d6875",
    },
    secondary: {
      main: "#b5838d",
    },
  },
});
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
