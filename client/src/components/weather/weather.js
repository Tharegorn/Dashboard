import React from "react";
import {PinDrop, Description, ErrorOutline} from '@material-ui/icons'

function Weath(props) {
    if (props.temp)
        return (<div><p><PinDrop /> : {props.city}</p><p>Temp : {props.temp}</p><p><Description />: {props.desc}</p></div>)
    else
        return (<div><p><ErrorOutline /> : {props.msg}</p></div>)
}

export default Weath;