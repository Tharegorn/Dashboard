import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode"
import { check_token } from "../../requests/user_requests";
import "./header.css";

function Header(props) {
  const [redir, setRedir] = useState(false)

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
      <>
        <header>
          <div >
            <div >
              <h1 >Dashboard</h1>
              <div>Welcome {jwt_decode(localStorage.getItem("session_id")).name}</div>
              <div class="div_ul_hor">
                <ul class="ul_hor">
                  <li onClick={() => { LogOut() }}>Logout</li>
                  <li onClick={() => { window.location.assign("/admin") }}>Admin</li>
                  <li onClick={() => { window.location.assign("/account") }}>Account</li>
                  <li onClick={() => { window.location.assign("/") }}>Home</li>
                </ul>
              </div>
            </div>
          </div>
        </header>
      </>
    );
  } else {
    return (
      <>
        {/* <div class="container">
          <div class="header-bar">
            <h1 class="logo">C</h1>
            <ul class="slider-menu">
              <li>Home</li>
            </ul>
          </div>
        </div>
      </> */}
      </>
    );
  }
}

export default Header;
