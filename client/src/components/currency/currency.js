import React from "react";
import { ErrorOutline, AccountBalance } from '@material-ui/icons'

function Currency(props) {
    if (props.amount !== "ERROR") {
        let money = props.amount.toFixed(3)
        return (<div><AccountBalance />{props.currency} : {money}</div>)
    } else
        return (<div><p><ErrorOutline /> : Invalid Parameters</p></div>)
}

export default Currency;