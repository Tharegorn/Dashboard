import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Elem from "../../components/card";
import "./home.css"
function Home() {
  const sid = localStorage.getItem("session_id");
  const [compos, setComp] = useState([<Elem />])
  let bite = compos.map((n, index) => <div className="unique" id={index}>{n}</div>);

  function addcp() {
    setComp([...compos, <Elem />])
  }

  if (sid) {
    return (
      <div>
        Dashboard
        <div className="compo">
          {bite}
        </div>
        <Button onClick={addcp}>click</Button>
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
