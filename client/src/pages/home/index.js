import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Widgets from "../../components/Card";
import Layout from "../_layouts/Home";
import "./home.css";
import { useDispatch } from "react-redux";
import { startVideoPlayer } from "../../actions/layout";
import AddNote from "../../components/AddNote";
import Notes from "../../components/Notes";
import { get_access } from "../../requests/user_requests";
import WidgetSelector from "../../components/WidgetSelector";
function Home() {
  const dispatch = useDispatch();
  const [compos, setComp] = useState([]);
  const [redir, setRedir] = useState();
  const [note, setNote] = useState(false);
  const [selector, setSelector] = useState(false);
  const widgets = compos.map((n, index) => (
    <div className="unique" key={index.toString()} id={index}>
      {n}
    </div>
  ));
  function addcp(type) {
    setComp([
      ...compos,
      <Widgets key={compos.length.toString()} id={compos.length} type={type} />,
    ]);
  }
  var token = localStorage.getItem("session_id");
  get_access(token, "/")
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
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setSelector(true);
          }}
        >
          Widget Selector
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setNote(true);
          }}
        >
          Create a new Note
        </Button>
        {note ? <AddNote onClose={note} setClose={setNote} /> : <></>}
        {selector ? (
          <WidgetSelector
            compo={addcp}
            onClose={selector}
            setClose={setSelector}
          />
        ) : (
          <></>
        )}
        <div className="compo">{widgets}</div>
        <Notes />
        <Layout />
      </div>
    );
  } else {
    return (
      <div className="login">
        <h1>
          <Button variant="contained" color="primary" href="/register">
            Register
          </Button>
          or
          <Button variant="contained" color="secondary" href="/login">
            Login
          </Button>
          ?
        </h1>
      </div>
    );
  }
}

export default Home;
