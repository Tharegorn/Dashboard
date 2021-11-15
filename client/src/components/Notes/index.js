import React, { useState, useEffect } from "react";
import { getNotes } from "../../requests/user_requests";
import jwt_decode from "jwt-decode";
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
    getNotes(jwt_decode(localStorage.getItem("session_id")).id).then((res) => {
      setNotes(res.data.content);
    });
  }
  function retrieve_delete() {
    getNotes(jwt_decode(localStorage.getItem("session_id")).id).then((res) => {
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
                      update_note_title(item.id, e.target.childNodes[0].data);
                    }}
                  >
                    {item.title}
                  </h2>
                  <p
                    suppressContentEditableWarning={true}
                    className="content"
                    contentEditable
                    onInput={(e) => {
                      update_note_content(item.id, e.target.childNodes[0].data);
                    }}
                  >
                    {item.content}
                  </p>
                  <Delete
                    onClick={() => {
                      delete_note(item.id);
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
