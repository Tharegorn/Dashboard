import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Elem from "../../components/card";
import { check_token } from "../../requests/user_requests";
import "./home.css"
function Home() {
  const [compos, setComp] = useState([])
  const [redir, setRedir] = useState()
  let Widgets = compos.map((n, index) => <div className="unique" key={index} id={index}>{n}</div>);

  function addcp() {
    setComp([...compos, <Elem key={compos.length} id={compos.length} />])
  }
  var token = localStorage.getItem("session_id");
  check_token(token).then((res) => {
    setRedir(true)
  }).catch((err) => {
    localStorage.removeItem("session_id");
    setRedir(false)
  })
  if (redir === true) {
    return (
      <div>
        <Button variant="contained" color="primary" onClick={addcp}>Add a new Widget</Button>
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
