import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import {
  FormHelperText,
  TextField,
  FormControl,
} from "@material-ui/core";
import { GitHub, Facebook, LinkedIn } from "@material-ui/icons"
import { loginUser } from "../../requests/user_requests";

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
        localStorage.setItem("session_id", response.data.data.token);
        setRegis(true);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setHelp("Problème");
      });
  }
  if (regis === true) return <Redirect to="/" />;
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
        <div>
          <GitHub />
          <Facebook />
          <LinkedIn />
        </div>
        <Link className="sign" to="/register">
          Can't Sign in?
        </Link>
      </FormControl>
    </div>
  );
}

export default Login;
