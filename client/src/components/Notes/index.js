import React, { useState } from "react"
import { getNotes } from "../../requests/user_requests";
import jwt_decode from "jwt-decode"
function Notes() {
    const [notes, setNotes] = useState(null)
    getNotes(jwt_decode(localStorage.getItem("session_id")).id).then((res) => {
        setNotes(res.data.content)
    })
    return (
        <>
            {notes ? notes.map((item, index) => (<div key={index}><div>{item.title} {item.content}</div></div>)) : <div>no</div>}
        </>
    )
}

export default Notes;