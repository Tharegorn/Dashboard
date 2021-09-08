import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import jwt_decode from "jwt-decode"
import { check_token } from "../../requests/user_requests";
import "./header.css";

function Header() {
  const [redir, setRedir] = useState()

  function LogOut() {
    localStorage.removeItem("session_id");
    window.location.reload();
  }
  useEffect(() => {
    var token = localStorage.getItem("session_id");
    check_token(token).then((res) => {
      setRedir(true)
    }).catch((err) => {
      localStorage.removeItem("session_id");
      setRedir(false)
    })
  }, [])
    if (redir === true) {
      return (
        <header>
          <p>Welcome {jwt_decode(localStorage.getItem("session_id")).name}</p>
          <Button variant="contained" color="primary" onClick={LogOut}>
            Log Out
          </Button>
        </header>
      );
    } else {
    return (
      <header>
        <p> Header !</p>
      </header>
    );
  }
}

export default Header;
