var axios = require("axios").default;
const express = require("express");
const rooter = express.Router()
const key = "9478992d291326ad91f980d7b893025f"


function options(c) {
    return ({
        method: 'GET',
        url: 'https://api.openweathermap.org/data/2.5/weather',
        params: {
            q: c,
            appid: key,
            units: "metric",
            lang: "fr"
        }
    })
}

rooter.post('/weather', (req, res) => {
    res.set("Content-Type", "application/json");
    if (req.body.data.City) {
        axios.request(options(req.body.data.City)).then(function (rev) {
            res.status(200).json({ status: "Succes", code: 200, city: rev.data.name, temp: rev.data.main.temp, desc: rev.data.weather[0].description })
        }).catch(function (error) {
            res.status(500).json({ status: "Failure", code: 500, msg: "Unknow City" })
        });
    } else {
        res.status(500).json({ status: "Failure", code: 500, msg: "Unknow City" })
    }
})

module.exports = rooter;