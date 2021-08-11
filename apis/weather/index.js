var axios = require("axios").default;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express()
var options = {
  method: 'GET',
  url: 'https://community-open-weather-map.p.rapidapi.com/weather',
  params: {
    q: 'qsdqs',
    lang: 'fr_fr',
    units: 'metric',
  },
  headers: {
    'x-rapidapi-key': '990cf10511msh64a893edd2e1083p145fb6jsn72ba086c0b1a',
    'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
  }
};


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.listen(4243, () => {
  console.log("Listening on port 4243.");
});

app.post("/weather", (req, res) => {
  // axios.request(options).then(function (res) {
// 	console.log("City :" + res.data.name, "Temp:" + res.data.main.temp, "Desc: " + res.data.weather[0].description);
// }).catch(function (error) {
//     console.log("fdp")
// });
    res.set("Content-Type", "application/json");
    console.log(req.body.data.City)
    if (req.body.data.City == "Paris")
      res.status(200).json({status: "Succes", code: 200,city: req.body.data.City, temp: "Unknow", desc: "Unknow"})
    else
      res.status(500).json({status: "Failure", code: 500,city: req.body.data.City, msg: "Unknow City"})


    
})
