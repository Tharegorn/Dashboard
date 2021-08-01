import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  FormHelperText,
  TextField,
  FormControl,
} from "@material-ui/core";

function Register() {
  const [pass, setPass] = useState("");
  const [cpass, setCPass] = useState("");
  const [error, setError] = useState(false);
  const [user, setUser] = useState("");
  const [help, setHelp] = useState("Please fill username and password.");

  function Check_register() {
    if (user === "") {
      setError(true);
      setHelp("Username can't be empty !");
      return;
    }
    if (pass === "" || cpass === "") {
      setError(true);
      setHelp("Password can't be empty !");
      return;
    }
    if (cpass !== pass) {
      setError(true);
      setHelp("Password and confirm password must be the sames !");
      return;
    }
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
        <TextField
          label="Confirm Password"
          error={error}
          type="password"
          variant="filled"
          value={cpass}
          onChange={(e) => {
            setCPass(e.target.value);
          }}
        />
        <Button onClick={Check_register} variant="contained" color="primary">
          Log in !
        </Button>
        <FormHelperText>{help}</FormHelperText>
      </FormControl>
      <div>
        Already have an account ? Let's move <Link to="/login">there</Link> !
      </div>
    </div>
  );
}

export default Register;
