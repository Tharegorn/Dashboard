import React from "react";
import { useDispatch } from "react-redux";
import { startVideoPlayer } from "../../actions/layout";

import { Visibility, OndemandVideo, PersonAdd, ErrorOutline } from '@material-ui/icons'

function Youtube(props) {
    const dispatch = useDispatch();

    if (props.name !== "ERROR") {
        return (<div>
            <img src={props.thumbnail} alt={props.name} />
            <h1><a href={"https://youtube.com/channel/" + props.id} rel="noreferrer" target="_blank">{props.name}</a></h1>
            <p><Visibility /> : {props.views}</p>
            <p><PersonAdd /> : {props.subs}</p>
            <p><OndemandVideo /> : {props.vids}</p>
            {props.video != null? <div onClick={() => dispatch(startVideoPlayer(props.video))}>Watch Video</div> : <p>Any last video</p>}
        </div>)
    }
    else {
        return (<div>
            <div><p><ErrorOutline /> :  Error while requesting to API</p></div>
        </div>)
    }
}

export default Youtube;