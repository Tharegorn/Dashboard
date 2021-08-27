import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import { checkAdmin } from '../../requests/user_requests'

function Admin() {
    const sid = localStorage.getItem("session_id");
    const [res, setRed] = useState()

    useEffect((sid) => {
        if (!sid)
            setRed(false)
        else {
            checkAdmin(sid).then((res) => {
                console.log("avav")
                setRed(true)
            }).catch((err) => {
                setRed(false)
            })
        }
    }, [])
    if (res === false)
        return (<Redirect to='/' />)
    return (<h1>Admin page</h1>)
}

export default Admin;