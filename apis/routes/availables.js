var axios = require("axios").default;
const express = require("express");
const rooter = express.Router()
const data = require("../Output")

rooter.post('/available', (req, res) => {
    res.set("Content-Type", "application/json");
    res.status(200).json({ status: "Succes", code: 200, apis: [{ id: 0, name: "None" }, { id: 1, name: "Weather" }, { id: 2, name: "Currency" }, { id: 3, name: "YouTube" }, {id: 3, name: "Jokes"}] })
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
    res.status(200).json({
        status: "Succes", code: 200, fields:
            [{ id: 0, type: "select", name: "From", values: data },
            { id: 1, type: "select", name: "To", values: data },
            { id: 2, type: "input", name: "Value" }]
    })
})

rooter.post('/search/jokes', (req, res) => {
    res.set("Content-Type", "application/json");
    res.status(200).json({
        status: "Succes", code: 200
    })
})

module.exports = rooter;