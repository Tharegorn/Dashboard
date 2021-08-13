import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  Typography,
  CardContent,
  Button,
} from "@material-ui/core/";
import { getWeather, getChannel, getCurrency } from "../requests/apis_requests"
import { widgets } from "./data.js"
import Weather from "./weather/weather.js"
import Youtube from "./youtube/youtube.js"
import Currency from "./currency/currency"

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    width: 100,
    background: "linear-gradient(45deg, grey 30%, white 90%)",
    border: 0,
    borderRadius: 10,
    boxShadow: "0 3px 5px 2px grey",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function Elem(props) {
  const classes = useStyles();
  const [type, setType] = useState(0);
  const [compo, setCompo] = useState(null);
  var data = {}
  let activate;
  let searchfield;
  let edit = <div></div>;
  function activ() {
    switch (type) {
      case 1:
        getWeather(data).then((res) => {
          setCompo(<Weather temp={res.data.temp} city={res.data.city} desc={res.data.desc} />)
        }).catch((err) => {
          setCompo(<Weather msg="Ville inconnue" />)
          throw err;
        })
        break;
      case 2:
        getCurrency(data).then((res) => {
          setCompo(<Currency amount={res.data.amount} currency={res.data.currency}/>)
        }).catch((err) => {
          setCompo(<Currency amount="ERROR"/>)
          throw err;
        })
      break;
      case 3:
        getChannel(data).then((res) => {
          setCompo(<Youtube name={res.data.name} thumbnail={res.data.thumbnail} id={res.data.id} views={res.data.views} subs={res.data.subs} vids={res.data.vids} />)
        }).catch((err) => {
          throw err;
        })
        break;
      default:
        break;
    }
  }
  if (compo === null) {
    if (type !== 0) {
      activate = (
        <CardActions>
          <Button size="small" onClick={activ} >Search</Button>
        </CardActions>
      );
    } else {
      activate = <div></div>;

    }
    searchfield = <div><InputLabel>Type</InputLabel>
      <Select
        value={type}
        onChange={(e) => {
          setType(e.target.value);
          data = {}
        }}
      >
        {widgets.map((item) => (<MenuItem value={item.id}>{item.name}</MenuItem>))}
      </Select>
      {widgets.map((item) => (item.fields))[type].map((second, index) => (<TextField key={index} label={second} name={second} onChange={(e) => { e.preventDefault(); data[second] = e.target.value; }} />))}</div>
  } else {
    edit = <Button size="small" onClick={(e) => { e.preventDefault(); setCompo(null) }}>Edit</Button>
    searchfield = <div></div>
  }
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Select widget {props.id}
        </Typography>
        {searchfield}
      </CardContent>
      {activate}
      {compo}
      <CardActions>
        {edit}
        <Button size="small" onClick={(e) => { e.preventDefault(); document.getElementById("" + props.id + "").remove(); }}>Delete</Button>
      </CardActions>;
    </Card>
  );
}

export default Elem;