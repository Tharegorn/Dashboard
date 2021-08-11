import React from "react";


function Weath(props) {
    console.log(props)
    if (props.temp)
        return (<div><p>City : {props.city}</p><p>Temp : {props.temp}</p><p>Desc: {props.desc}</p></div>)
    else
        return (<div><p>Error : {props.msg}</p></div>)
}

export default Weath;