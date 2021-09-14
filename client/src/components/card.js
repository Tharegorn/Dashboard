import React, { useState, useEffect } from "react";
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
import { getWeather, getChannel, getCurrency, getWidgets, getFields } from "../requests/apis_requests"
// import { widgets } from "./data.js"
import Weather from "./weather/weather.js"
import Youtube from "./youtube/youtube.js"
import Currency from "./currency/currency"
import { SettingsInputComponentRounded } from "@material-ui/icons";

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
  const [type, setType] = useState("None");
  const [compo, setCompo] = useState(null);
  const [fields, setFields] = useState(<div></div>);
  const [api, setApi] = useState()
  const [tmp, setTmp] = useState({})
  var search = <div></div>
  var data = {}
  let edit = <div></div>;
  useEffect(() => {
    getWidgets().then((resp) => {
      setApi(resp.data.apis)
    })
  }, [])
  function activ() {
    switch (type) {
      case "Weather":
        getWeather(data).then((res) => {
          setCompo(<Weather temp={res.data.temp} city={res.data.city} desc={res.data.desc} />)
        }).catch((err) => {
          setCompo(<Weather msg="Ville inconnue" />)
          throw err;
        })
        break;
      case "Currency":
        getCurrency(data).then((res) => {
          setCompo(<Currency amount={res.data.amount} currency={res.data.currency} />)
        }).catch((err) => {
          setCompo(<Currency amount="ERROR" />)
          throw err;
        })
        break;
      case "YouTube":
        getChannel(data).then((res) => {
          setCompo(<Youtube name={res.data.name} thumbnail={res.data.thumbnail} id={res.data.id} views={res.data.views} subs={res.data.subs} vids={res.data.vids} />)
        }).catch((err) => {
          setCompo(<Youtube name="ERROR" />)
          throw err;
        })
        break;
      default:
        break;
    }
  }
  if (compo === null) {
    if (type !== 0) {
      search = <Button onClick={(e) => { e.preventDefault(); activ(); }}>
        Search
      </Button>
    } else {
    }
  }
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Select widget
        </Typography>
        {compo ? compo : <div><InputLabel>Type</InputLabel>
          <Select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setTmp("d")
              if (e.target.value !== "None") {
                getFields(e.target.value).then((res) => {
                  setTmp(res)
                })
              }
              else setFields(<div></div>)
              data = {}
            }}
          >
            {api ? api.map((item) => (<MenuItem value={item.name}>{item.name}</MenuItem>)) : <MenuItem value='None'>None</MenuItem>}
          </Select>
          {tmp.data ? tmp.data.fields.map((item) => (<div>{item.values ?
            <Select onChange={(ev) => { ev.preventDefault(); data[item.name] = ev.target.value }}>{item.values.map((val) => (<MenuItem key={val.id} id={val.name} value={val.name}>{val.name}</MenuItem>))}</Select> :
            <TextField onChange={(ev) => { ev.preventDefault(); data[item.name] = ev.target.value }} id={item.id} label={item.name} />}</div>)) : <div></div>}</div>}
      </CardContent>
      <CardActions>
        {edit}{search}
        <Button size="small" onClick={(e) => { e.preventDefault(); document.getElementById("" + props.id + "").remove(); }}>Delete</Button>
      </CardActions>
    </Card>
  );
}

export default Elem;