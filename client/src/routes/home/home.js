import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Elem from "../../components/card";
import "./home.css"
function Home() {
  const sid = localStorage.getItem("session_id");
  const [compos, setComp] = useState([])
  let bite = compos.map((n, index) => <div className="unique" key={index} id={index}>{n}</div>);

  function addcp() {
    setComp([...compos, <Elem id={compos.length}/>])
  }

  if (sid) {
    return (
      <div>
        Dashboard
        <Button onClick={addcp}>click</Button>
        <div className="compo">
          {bite}
        </div>
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
