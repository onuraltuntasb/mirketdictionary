import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import login from "../assets/login.png";
import signup from "../assets/signup.png";

const SingedOutLinks = () => {
  return (
    <ul className="right">
      <Link to="/signup" style={{ textDecoration: "none", color: "white" }}>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
        >
          <img title="sign up" src={signup} alt="login" height="30" width="30"></img>
        
        </IconButton>
      </Link>

      <Link to="/signin" style={{ textDecoration: "none", color: "white" }}>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
        >
          <img title="log in" src={login} alt="login" height="30" width="30"></img>{" "}
        
        </IconButton>
      </Link>
    </ul>
  );
};

export default SingedOutLinks;
