var axios = require("axios").default;
const express = require("express");
const rooter = express.Router()

rooter.post('/available', (req, res) => {
    res.set("Content-Type", "application/json");
    res.status(200).json({ status: "Succes", code: 200, apis: [{ id: 0, name: "None" }, { id: 1, name: "Weather" }, { id: 2, name: "Currency" }, { id: 3, name: "YouTube" }] })
})

rooter.post('/search/youtube', (req, res) => {
    res.set("Content-Type", "application/json");
    res.status(200).json({ status: "Succes", code: 200, fields: [{ id: 0, type: "input", name: "Channel" }] })

})

rooter.post('/search/weather', (req, res) => {
    res.set("Content-Type", "application/json");
    res.status(200).json({ status: "Succes", code: 200, fields: [{ id: 0, type: "input", name: "City" }] })

})

rooter.post('/search/currency', (req, res) => {
    res.set("Content-Type", "application/json");
    res.status(200).json({ status: "Succes", code: 200, fields: [{ id: 0, type: "select", name: "From", values: [{ id: 0, name: "EUR" }, { id: 1, name: "BTC" }, { id: 2, name: "USD" }] }, { id: 1, type: "select", name: "To", values: [{ id: 0, name: "EUR" }, { id: 1, name: "BTC" }, { id: 2, name: "USD" }] }, { id: 2, type: "input", name: "Value" }] })

})

module.exports = rooter;