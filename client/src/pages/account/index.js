import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { check_token } from "../../requests/user_requests";
import { GitHub, Spotify } from "@material-ui/icons";
import { Button } from "@material-ui/core";
function Account() {
    const [redir, setRedir] = useState();
    useEffect(() => {
        var token = localStorage.getItem("session_id");
        check_token(token).then((res) => {
            setRedir(true);
        }).catch((err) => {
            localStorage.removeItem("session_id");
            setRedir(false);
        })
    }, [])
    if (redir == false)
        return <Redirect to="/" />;
    else {
        return (<div>
            <h1>Linked Accounts</h1>
            <hr></hr>
            <h1>Availables Services</h1>
            <hr></hr>
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
        </div>
        )
    }
}

export default Account;