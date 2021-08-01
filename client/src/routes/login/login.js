import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  FormHelperText,
  TextField,
  FormControl,
} from "@material-ui/core";

function Login() {
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);
  const [user, setUser] = useState("");
  const [help, setHelp] = useState("Please fill username and password.");

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
    console.log(pass, user);
  }
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
        <Button onClick={Check_login} variant="contained" color="primary">Log in !</Button>
        <FormHelperText>{help}</FormHelperText>
      </FormControl>
      <div>
        First time you'r here ? Let's <Link to="/register">join</Link> us !
      </div>
    </div>
  );
}

export default Login;
