import React from "react";
import { useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Button from "@material-ui/core/Button";
import "./header.css";

function Header() {
  const sid = localStorage.getItem("session_id");
  const location = useLocation();

  function LogOut() {
    localStorage.removeItem("session_id");
    window.location.reload();
  }
  if (location.pathname === "/") {
    if (sid) {
      return (
        <header>
          <p>Welcome {jwt_decode(sid).name}</p>
          <Button variant="contained" color="primary" onClick={LogOut}>
            Log Out
          </Button>
        </header>
      );
    } else {
      return (
        <header>
          <p>Home header !</p>
        </header>
      );
    }
  } else {
    return (
      <header>
        <p> Generic Header !</p>
      </header>
    );
  }
}

export default Header;
