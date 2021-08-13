import React from 'react';
import {Redirect} from 'react-router-dom'
import jwt_decode from "jwt-decode";

function Admin() {
  const sid = localStorage.getItem("session_id");

    if (!sid)
        return <Redirect to="/" />
    if (jwt_decode(sid).perm !== 1)
        return <Redirect to='/' />
    else
        return (<h1>Admin page</h1>)
}

export default Admin;