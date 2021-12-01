import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import {
  FormHelperText,
  TextField,
  FormControl,
} from "@material-ui/core";
import "../../requests/user_requests";
import { createUser } from "../../requests/user_requests";
import "./register.css";

function Register() {
  const [pass, setPass] = useState("");
  const [cpass, setCPass] = useState("");
  const [error, setError] = useState(false);
  const [user, setUser] = useState("");
  const [help, setHelp] = useState("Please fill username and password.");
  const [regis, setRegis] = useState(false);

  async function Check_register() {
    if (user === "") {
      setError(true);
      setHelp("Username can't be empty !");
      return;
    }
    if (pass === "" || cpass === "") {
      setError(true);
      setHelp("Passwords can't be empty !");
      return;
    }
    createUser(user, pass, cpass)
      .then((res) => {
        setHelp("")
        setError(false);
        setRegis(true);
      })
      .catch((err) => {
        setError(true);
        setHelp(err.response.data.status);
      });
  }
  if (regis === true) return <Redirect to="/" />;
  return (
    <div className="login">
      <FormControl className="login-form" error={error} variant="filled">
        <h1>REGISTER</h1>
        <div className="textb">
          <TextField
            className="text"
            label="Username"
            error={error}
            type="Username"
            value={user}
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
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
        </div>
        <div className="textb">
          <TextField
            className="text"
            label="Confirm Password"
            error={error}
            type="password"
            value={cpass}
            onChange={(e) => {
              setCPass(e.target.value);
            }}
          />
        </div>
        <div className="helper">
          <FormHelperText>{help}</FormHelperText>
        </div>
        <button className="btn fas fa-arrow-right" onClick={Check_register}>
          Register
        </button>
        <Link className="sign" to="/login">
          Already have an account ?
        </Link>
      </FormControl>
    </div>
  );
}

export default Register;
