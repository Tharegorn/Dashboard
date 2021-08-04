import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Elem from "../../components/card";
import { InputLabel } from "@material-ui/core";

function Home() {
  const sid = localStorage.getItem("session_id");
  const [compos, setCompo] = useState([]);

  if (sid) {
    return (
      <div>
        Dashboard
        <div className="compo">
          <Elem />
        </div>
        <Button>click</Button>
      </div>
    );
  } else {
    return (
      <div>
        <Button variant="contained" color="primary" href="/register">
          Register
        </Button>
        <Button variant="contained" color="primary" href="/login">
          Login
        </Button>
      </div>
    );
  }
}

export default Home;
