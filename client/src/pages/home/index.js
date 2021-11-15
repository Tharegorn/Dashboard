import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Elem from "../../components/card";
import { check_token } from "../../requests/user_requests";
import Layout from "../_layouts/Home";
import "./home.css";
import { useDispatch } from "react-redux";
import { startVideoPlayer } from "../../actions/layout";
import AddNote from "../../components/AddNote";
import Notes from "../../components/Notes";
function Home() {
  const dispatch = useDispatch();
  const [compos, setComp] = useState([]);
  const [redir, setRedir] = useState();
  const [note, setNote] = useState(false);
  const Widgets = compos.map((n, index) => (
    <div className="unique" key={index.toString()} id={index}>
      {n}
    </div>
  ));
  function addcp() {
    setComp([
      ...compos,
      <Elem key={compos.length.toString()} id={compos.length} />,
    ]);
  }
  function getter() {
    // getNotes(jwt_decode(localStorage.getItem("session_id")).id)
  }
  var token = localStorage.getItem("session_id");
  check_token(token)
    .then((res) => {
      setRedir(true);
    })
    .catch((err) => {
      localStorage.removeItem("session_id");
      setRedir(false);
    });
  if (redir === true) {
    return (
      <div>
        <Button variant="contained" color="primary" onClick={addcp}>
          Add a new Widget
        </Button>
        <TextField
          label="Paste here a youtube link"
          onChange={(e) => {
            e.target.value.includes("https://www.youtube.com/watch?v=") ? (
              dispatch(startVideoPlayer(e.target.value.split("=")[1]))
            ) : (
              <></>
            );
          }}
        ></TextField>
        <Button variant="contained" color="primary" onClick={() => { setNote(true) }}>
          Create a new Note
        </Button>
        <Button onClick={() => {
          getter()
        }}>Load</Button>
        {note ? <AddNote onClose={note} setClose={setNote} /> : <></>}
        <div className="compo">{Widgets}</div>
        <Notes/>
        <Layout />
      </div >
    );
  } else {
    return (
      <div className="login">
        <h1>Blue or red ?</h1>
        <div className="textb"></div>
        <div className="textb"></div>
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
