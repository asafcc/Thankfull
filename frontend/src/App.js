import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { useState } from "react";
import HomePage from "./Pages/HomePage";
import RegisterPage from "./Pages/RegisterPage";
import LogininPage from "./Pages/LogininPage";
import Nav from "./components/Nav";
import StateContext from "./Context/StateContext";
import DispatchContext from "./Context/DispatchContext";
import GoInspiredPage from "./Pages/GoInspiredPage";

function App() {
  const userDetailsFromLS = localStorage.getItem("userDetailsThankfulApp")
    ? JSON.parse(localStorage.getItem("userDetailsThankfulApp"))
    : null;

  const [userDetails, setUserDetails] = useState(userDetailsFromLS);

  return (
    <StateContext.Provider value={userDetails}>
      <DispatchContext.Provider value={setUserDetails}>
        <Router>
          <Nav />
          <Route path="/" component={HomePage} exact />
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" component={LogininPage} />
          <Route path="/explore" component={GoInspiredPage} />
        </Router>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
