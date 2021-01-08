import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaRegLightbulb } from "react-icons/fa";
import { Button, Tooltip } from "@material-ui/core";
import StateContext from "../../Context/StateContext";
import DispatchContext from "../../Context/DispatchContext";

import "./Nav.css";

function Nav() {
  const userDetails = useContext(StateContext);
  const setUserDetails = useContext(DispatchContext);

  return (
    <nav className="nav">
      <Link to="/">
        <h1 id="headline">Thankful.</h1>
      </Link>
      <span style={{ display: "flex", alignItems: "center" }}>
        <Tooltip title="Go Inspired" arrow>
          <span>
            <Link to="/explore">
              <FaRegLightbulb id="lightbulb" />
            </Link>
          </span>
        </Tooltip>

        {userDetails && (
          <Link
            style={{
              marginTop: "1rem",
            }}
            to="/login"
          >
            <Button
              style={{
                marginBottom: "0.5rem",
                marginLeft: "1rem",
                // backgroundColor: "white",
                // color: "#b5838d",
              }}
              color="secondary"
              variant="contained"
              disableElevation
              onClick={() => {
                localStorage.removeItem("userDetailsThankfulApp");
                setUserDetails(null);
              }}
            >
              Logout
            </Button>
          </Link>
        )}
      </span>
    </nav>
  );
}

export default Nav;
