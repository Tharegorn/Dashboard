import React from "react";

function Youtube(props) {
    return (<div>
        <img src={props.thumbnail} alt={props.name}/>
        <h1><a href={"https://youtube.com/channel/" + props.id} rel="noreferrer" target="_blank">{props.name}</a></h1>
        <p>Views : {props.views}</p>
        <p>Subs : {props.subs}</p>
        <p>Vids : {props.vids}</p>
    </div>)
}

export default Youtube;