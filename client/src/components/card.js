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
import { getWeather } from "../requests/weather_requests"
import { widgets } from "./data.js"

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
  const [data, setData] = useState({});
  const [weather, setWeath] = useState("");
  let activate;
  let button = <CardActions>
    <Button size="small" onClick={(e) => { e.preventDefault(); document.getElementById("" + props.id + "").remove(); }}>Delete</Button>
  </CardActions>;

  function activ() {
    getWeather().then((res) => {
      console.log(res)
      setWeath(res.data.data.value)
    }).catch((err) => {
      throw err;
    })
  }
  if (type !== 0) {
    activate = (
      <CardActions>
        <Button size="small" onClick={activ} >Activate</Button>
      </CardActions>
    );
  } else {
    activate = <div></div>;
  }

  return (
    <Card className={classes.root}>
      <form>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Select widget {props.id}{weather}
          </Typography>
          <InputLabel>Type</InputLabel>
          <Select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
             {widgets.map((item) => (<MenuItem value={item.id}>{item.name}</MenuItem>))}
          </Select>
          {widgets.map((item) => (item.fields))[type].map((second, index) => (<TextField key={index} label={second} onChange={(e) => {e.preventDefault();}}/>))}
        </CardContent>
        {activate}
        {button}
      </form>
    </Card>
  );
}

export default Elem;