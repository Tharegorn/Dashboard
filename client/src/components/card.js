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

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    width: 100,
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 10,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
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

export default function Elem(props) {
  const classes = useStyles();
  const [type, setType] = useState(0);
  const [data, setData] = useState("");
  let label;
  let activate;
  if (type !== 0) {
    label = (
      <TextField
        label="specifications"
        value={data}
        onChange={(e) => {
          setData(e.target.value);
        }}
      ></TextField>
    );
    activate = (
      <CardActions>
        <Button size="small">Activate</Button>
      </CardActions>
    );
  } else {
    label = <div></div>;
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
            Select widget {props.id}
          </Typography>
          <InputLabel>Type</InputLabel>
          <Select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <MenuItem value={0}>
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>Weather</MenuItem>
            <MenuItem value={2}>Youtube</MenuItem>
          </Select>
          {label}
        </CardContent>
        {activate}
        <CardActions>
          <Button size="small" onClick={(e) => {e.preventDefault(); console.log(props.id); document.getElementById("" + props.id + "").remove();}}>Delete</Button>
        </CardActions>
      </form>
    </Card>
  );
}
