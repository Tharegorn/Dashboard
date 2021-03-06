import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FormHelperText,
  TextField,
  FormControl,
} from "@material-ui/core";
import { loginUser } from "../../requests/user_requests";
import "./login.css";

function Login() {
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);
  const [user, setUser] = useState("");
  const [help, setHelp] = useState("Please fill username and password.");
  const [regis, setRegis] = useState(false);

  function Check_login() {
    if (user === "") {
      setError(true);
      setHelp("Username can't be empty !");
      return;
    }
    if (pass === "") {
      setError(true);
      setHelp("Password can't be empty !");
      return;
    }
    loginUser(user, pass)
      .then((response) => {
        setError(false);
        localStorage.setItem("session_id", response.data.token);
        localStorage.setItem("session_id_refresh", response.data.refreshToken);
        setRegis(true);
      }).catch((err) => {
        setError(true);
        setHelp(err.response.data.status)
      });
  }
  if (regis === true) {
    window.location.assign("/")
  }
  return (
    <div className="login" >
      <FormControl className="login-form" error={error} variant="filled">
        <h1>SIGN IN</h1>
        <div className="textb">
          <TextField
            className="text"
            label="Username"
            error={error}
            type="Username"
            value={user}
            formControlProps={{
              fullWidth: true,
            }}
            onChange={(e) => {
              setUser(e.target.value);
            }}
          />
        </div>
        <div className="textb">
          <TextField
            className="text"
            label="Password"
            error={error}
            type="password"
            value={pass}
            formControlProps={{
              fullWidth: true,
            }}
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
        </div>
        <div className="helper">
          <FormHelperText>{help}</FormHelperText>
        </div>
        <button className="btn fas fa-arrow-right" onClick={Check_login}>
          Log In
        </button>
        <Link className="sign" to="/register">
          Can't Sign in?
        </Link>
      </FormControl>
    </div>
  );
}

export default Login;
