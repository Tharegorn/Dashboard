import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Elem from "../../components/card";
import "./home.css"
function Home() {
  const sid = localStorage.getItem("session_id");
  const [compos, setComp] = useState([])
  let Widgets = compos.map((n, index) => <div className="unique" key={index} id={index}>{n}</div>);

  function addcp() {
    setComp([...compos, <Elem key={compos.length} id={compos.length}/>])
  }
  if (sid) {
    return (
      <div>
        Dashboard
        <Button onClick={addcp}>click</Button>
        <div className="compo">
          {Widgets}
        </div>
      </div>
    );
  } else {
    return (
      <div className="login" >
        <h1>Blue or red ?</h1>
        <div className="textb">
        </div>
        <div className="textb">
        </div>
        <Button variant="contained" color="primary" href="/register">
          Register
        </Button>
        <Button variant="contained" color="secondary" href="/login">
          Login
        </Button>
    </div>
    );
  }
}

export default Home;
