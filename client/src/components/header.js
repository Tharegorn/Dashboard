import React from "react";
import { useLocation } from "react-router-dom";
import "./header.css";

function Header() {
  const location = useLocation();
  if (location.pathname === "/") {
    return (
      <header>
        <p>Home header !</p>
      </header>
    );
  } else {
    return (
      <header>
        <p> Generic Header !</p>
      </header>
    );
  }
}

export default Header;
