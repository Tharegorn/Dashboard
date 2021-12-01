import React, { useState, useEffect } from "react";
import { getNotes } from "../../requests/user_requests";
import "./index.css";
import Draggable from "react-draggable";
import {
  update_note_content,
  update_note_title,
  delete_note,
} from "../../requests/user_requests";
import { Delete } from "@material-ui/icons";

function Notes() {
  const [notes, setNotes] = useState(null);
  function retrieve() {
    getNotes(localStorage.getItem("session_id")).then((res) => {
      setNotes(res.data.content);
    });
  }
  function retrieve_delete() {
    getNotes(localStorage.getItem("session_id")).then((res) => {
      setNotes(null);
      setNotes(res.data.content);
    });
  }
  useEffect(() => {
    retrieve();
  }, []);
  return (
    <>
      {notes ? (
        <ul className="list">
          {notes.map((item, index) => (
            <Draggable key={index} handle=".handle">
              <li className="handle">
                <div className="card">
                  <h2
                    className="title"
                    contentEditable
                    suppressContentEditableWarning={true}
                    onInput={(e) => {
                      update_note_title(item.id, e.target.childNodes[0].data, localStorage.getItem("session_id"));
                    }}
                  >
                    {item.title}
                  </h2>
                  <p
                    suppressContentEditableWarning={true}
                    className="content"
                    contentEditable
                    onInput={(e) => {
                      update_note_content(item.id, e.target.childNodes[0].data, localStorage.getItem("session_id"));
                    }}
                  >
                    {item.content}
                  </p>
                  <Delete
                    onClick={() => {
                      delete_note(item.id, localStorage.getItem("session_id"));
                      retrieve_delete();
                    }}
                  />
                </div>
              </li>
            </Draggable>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </>
  );
}

export default Notes;
