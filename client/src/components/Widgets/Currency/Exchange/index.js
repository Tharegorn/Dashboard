import React, { useState, useEffect } from "react";
import { getMoney, getCurrency } from "../../../../requests/apis_requests";
import { ErrorOutline, AccountBalance } from "@material-ui/icons";
import {Select, MenuItem, TextField} from "@material-ui/core"
function Currency_exchange() {
  const [currency, setCurrency] = useState(null);
  const [list, setList] = useState(null);
  const [values, setValues] = useState({from: null, to: null, amount: null})
  useEffect(() => {
    getMoney(localStorage.getItem("session_id")).then((res) => {
      setList(res.data.list);
    });
  }, []);
  return (
    <div>
      Currency exchange
      <Select value={values.from} onChange={(e) => {setValues({from: e.target.value, to: values.to, amount: values.amount})}}
      >
        {list ? list.map((item, index) => (
          <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
        )): <></>}
      </Select>
      <Select value={values.to} onChange={(e) => {setValues({from: values.from, to: e.target.value, amount: values.amount})}}
      >
        {list ? list.map((item, index) => (
          <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
        )): <></>}
      </Select>
      <TextField type="number" label="Amount" color="secondary" vairant="outlined" onChange={(e) => {setValues({from: values.from, to: values.to, amount: e.target.value})}} 
      onKeyPress={(e) => {if (e.key === "Enter") {
        if (values.amount !== null && values.amount.length > 0)
          getCurrency(values.from, values.to, values.amount, localStorage.getItem("session_id")).then((res) => {
            console.log(res.data)
            setCurrency({curr: res.data.currency, amount: res.data.amount.toFixed(3)});
          }).catch((err) => {
            throw err
          })
      }}}
      />
      {currency ? <div><AccountBalance />{currency.amount} : {currency.curr}</div> : <></>}
    </div>
  );
}

export default Currency_exchange;
