import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import {
  Button,
  FormHelperText,
  TextField,
  FormControl,
} from "@material-ui/core";
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
    <div>
      <FormControl error={error} variant="filled">
        <TextField
          label="Username"
          error={error}
          type="Username"
          variant="filled"
          value={user}
          onChange={(e) => {
            setUser(e.target.value);
          }}
        />
        <TextField
          label="Password"
          error={error}
          type="password"
          variant="filled"
          value={pass}
          onChange={(e) => {
            setPass(e.target.value);
          }}
        />
        <Button onClick={Check_login} variant="contained" color="primary">
          Log in !
        </Button>
        <FormHelperText>{help}</FormHelperText>
      </FormControl>
      <div>
        First time you'r here ? Let's <Link to="/register">join</Link> us !
      </div>
    </div>
  );
}

export default Login;
