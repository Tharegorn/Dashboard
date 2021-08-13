import React from "react";
import {PinDrop, Description} from '@material-ui/icons'

function Weath(props) {
    console.log(props)
    if (props.temp)
        return (<div><p><PinDrop /> : {props.city}</p><p>Temp : {props.temp}</p><p><Description />: {props.desc}</p></div>)
    else
        return (<div><p>Error : {props.msg}</p></div>)
}

export default Weath;