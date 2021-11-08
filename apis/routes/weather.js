var axios = require("axios").default;
const express = require("express");
const rooter = express.Router()

function options(c) {
    return ({
        method: 'GET',
        url: 'https://community-open-weather-map.p.rapidapi.com/weather',
        params: {
            q: c,
            lang: 'en_en',
            units: 'metric',
        },
        headers: {
            'x-rapidapi-key': '990cf10511msh64a893edd2e1083p145fb6jsn72ba086c0b1a',
            'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
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