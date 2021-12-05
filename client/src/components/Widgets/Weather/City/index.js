import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import {getWeather} from "../../../../requests/apis_requests"
function WeatherCity() {
  const [city, setCity] = useState(null);
  const [weather, setWeather] = useState(null)
  return (
    <div>
      <div>Weather city</div>
      <TextField
        type="city"
        color="secondary"
        variant="outlined"
        label="Weather"
        onChange={(e) => {
          setCity(e.target.value);
        }}
        onKeyPress={(e) => {if (e.key === "Enter") {
          if (city !== null && city.length > 0)
            getWeather(city).then((res) => {
              setWeather({city: res.data.city, temp: res.data.temp, desc: res.data.desc})
            }).catch((err) => {
              throw err
            })
        }}}
      />
      {weather ? <div>{weather.city} {weather.temp} {weather.desc}</div>: <></>}
    </div>
  );
}

export default WeatherCity;
