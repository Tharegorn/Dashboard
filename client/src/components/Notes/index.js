import React, { useState, useEffect } from "react";
import { getNotes } from "../../requests/user_requests";
import jwt_decode from "jwt-decode";
import "./index.css";
import Draggable from "react-draggable";

function Notes() {
  const [notes, setNotes] = useState(null);
  function retrieve() {
    getNotes(jwt_decode(localStorage.getItem("session_id")).id).then((res) => {
      setNotes(res.data.content);
    });
  }
  useEffect(() => {
    retrieve();
  }, []);

  return (
    <>
      <div
        onClick={() => {
          retrieve();
        }}
      >
        Refresh
      </div>
      {notes ? (
        <ul className="list">
          {notes.map((item, index) => (
            <Draggable key={index} handle=".handle">
              <li className="handle">
                <div className="card">
                  <h2
                    className="title"
                    contentEditable
                    onInput={(e) => {
                      console.log(e.target.childNodes[0], item.id, "title");
                    }}
                  >
                    {item.title}
                  </h2>
                  <p
                    className="content"
                    contentEditable
                    onInput={(e) => {
                      console.log(e.target.childNodes[0], item.id, "content");
                    }}
                  >
                    {item.content}
                  </p>
                </div>
              </li>
            </Draggable>
          ))}
        </ul>
      ) : (
        <div>no</div>
      )}
    </>
  );
}

export default Notes;
