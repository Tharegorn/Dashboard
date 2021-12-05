import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { get_access } from "../../requests/user_requests";
import "./header.css";
import { useLocation } from 'react-router-dom'

function Header() {
  const [redir, setRedir] = useState(false);

  function LogOut() {
    localStorage.removeItem("session_id");
    window.location.reload();
  }
  const location = useLocation();

  function check_access() {
    get_access(localStorage.getItem("session_id"), location.pathname).then(() => {
      setRedir(true)
    }).catch(() => {
      setRedir(false)
    })
  }

  useEffect(() => {
    check_access();
  }, []);
  if (redir === true) {
    return (
      <>
        <header>
          <div>
            <div>
              <h1>Dashboard</h1>
              <div className="div_ul_hor">
                <ul className="ul_hor">
                  <div
                    className="handle"
                    onClick={() => {
                      window.location.assign("/");
                    }}
                  >
                    <span>Home</span>
                    <svg width="13px" height="10px" viewBox="0 0 13 10">
                      <path d="M1,5 L11,5"></path>
                      <polyline points="8 1 12 5 8 9"></polyline>
                    </svg>
                  </div>
                  <div
                    className="handle"
                    onClick={() => {
                      window.location.assign("/account");
                    }}
                  >
                    <span>Account</span>
                    <svg width="13px" height="10px" viewBox="0 0 13 10">
                      <path d="M1,5 L11,5"></path>
                      <polyline points="8 1 12 5 8 9"></polyline>
                    </svg>
                  </div>
                  <div
                    className="handle"
                    onClick={() => {
                      window.location.assign("/admin");
                    }}
                  >
                    <span>Admin</span>
                    <svg width="13px" height="10px" viewBox="0 0 13 10">
                      <path d="M1,5 L11,5"></path>
                      <polyline points="8 1 12 5 8 9"></polyline>
                    </svg>
                  </div>
                  <div
                    className="handle"
                    onClick={() => {
                      LogOut();
                    }}
                  >
                    <span>Logout</span>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </header>
      </>
    );
  } else {
    return <></>;
  }
}

export default Header;
