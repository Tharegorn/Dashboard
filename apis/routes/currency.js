var axios = require("axios").default;
const express = require("express");
const rooter = express.Router()

function getOpt(from, to, amount) {
    return ({
        method: 'GET',
        url: 'https://currency-converter13.p.rapidapi.com/convert',
        params: { from: from, to: to, amount: amount },
        headers: {
            'x-rapidapi-key': '990cf10511msh64a893edd2e1083p145fb6jsn72ba086c0b1a',
            'x-rapidapi-host': 'currency-converter13.p.rapidapi.com'
        }
    })
}

rooter.post("/currency", (req, res) => {
    res.set("Content-Type", "application/json");
    if (req.body.from&& req.body.to && req.body.value) {
        axios.request(getOpt(req.body.from, req.body.to, req.body.value || 1)).then(function (response) {
            res.status(200).json({ status: "Success", code: 200, amount: response.data.amount, currency: response.data.to })
        }).catch(function (error) {
            res.status(500).json({ status: "Failure", code: 500, msg: "Invalid parameters" })
        });
    } else {
        res.status(500).json({ status: "Failure", code: 500, msg: "Invalid parameters" })
    }
})

module.exports = rooter;