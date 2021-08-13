import React from "react";

import { Visibility, OndemandVideo, PersonAdd } from '@material-ui/icons'

function Youtube(props) {
    return (<div>
        <img src={props.thumbnail} alt={props.name} />
        <h1><a href={"https://youtube.com/channel/" + props.id} rel="noreferrer" target="_blank">{props.name}</a></h1>
        <p><Visibility /> : {props.views}</p>
        <p><PersonAdd /> : {props.subs}</p>
        <p><OndemandVideo /> : {props.vids}</p>
    </div>)
}

export default Youtube;