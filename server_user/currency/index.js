const data = require("./money.json")
const axios = require("axios")

exports.get_money = function (req, res) {
    res.status(200).json({status: "Success", code: 200, list: data});
}

function getOpt(from, to, amount) {
    return ({
        method: 'GET',
        url: 'https://currency-converter13.p.rapidapi.com/convert',
        params: { from: from, to: to, amount: amount },
        headers: {
            'x-rapidapi-key': process.env.CURRENCY_KEY,
            'x-rapidapi-host': 'currency-converter13.p.rapidapi.com'
        }
    })
}

exports.exchange = function (req, res)  {
    res.set("Content-Type", "application/json");
    if (req.query.from && req.query.to && req.query.value) {
        axios.request(getOpt(req.query.from, req.query.to, req.query.value || 1)).then(function (response) {
            res.status(200).json({ status: "Success", code: 200, amount: response.data.amount, currency: response.data.to })
        }).catch(function (error) {
            res.status(401).json({ status: "Failure", code: 500, msg: "Invalid parameters" })
        });
    } else {
        res.status(401).json({ status: "Failure", code: 500, msg: "Invalid parameters" })
    }
}