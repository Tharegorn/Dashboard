import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { check_token } from "../../requests/user_requests";
import { GitHub } from "@material-ui/icons";
import { Button, TextField } from "@material-ui/core";
import {updt_name, updt_psswd} from "../../requests/user_requests"
import jwt_decode from "jwt-decode";
function Account() {
    const [redir, setRedir] = useState();
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    useEffect(() => {
        var token = localStorage.getItem("session_id");
        check_token(token).then((res) => {
            setRedir(true);
        }).catch((err) => {
            localStorage.removeItem("session_id");
            setRedir(false);
        })
    }, [])
    if (redir === false)
        return <Redirect to="/" />;
    else {
        return (<div>
            <h3>Linked Accounts</h3>
            <hr></hr>
            <h3>Availables Services</h3>
            <div>
                <h3>GitHub</h3>
                <GitHub />
                <Button variant="contained" color="primary">Link</Button>
            </div>
            <div>
                <h3>Spotify</h3>
                <GitHub />
                <Button variant="contained" color="primary">Link</Button>
            </div>
            <div>
                <h3>Epitech</h3>
                <GitHub />
                <Button variant="contained" color="primary">Link</Button>
            </div>
            <hr></hr>
            <h3>Modify Informations</h3>
            <form>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Username"
                    type="name"
                    variant="standard"
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                />
                <Button color="success" variant="contained" onClick={() => updt_name(jwt_decode(localStorage.getItem("session_id")).id, name)}>Save</Button>
            </form>
            <form>
                <TextField
                    autoFocus
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    variant="standard"
                    onChange={(e) => { setPassword(e.target.value) }}
                />
                <Button color="success" variant="contained" onClick={() => updt_psswd(jwt_decode(localStorage.getItem("session_id")).id, password)}>Save</Button>
            </form>
        </div>
        )
    }
}

export default Account;