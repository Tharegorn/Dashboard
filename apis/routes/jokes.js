var axios = require("axios").default;
const express = require("express");
const rooter = express.Router()

function options() {
    return ({
        method: 'GET',
        url: 'https://dad-jokes.p.rapidapi.com/random/joke/png',
        headers: {
            'x-rapidapi-host': 'dad-jokes.p.rapidapi.com',
            'x-rapidapi-key': '990cf10511msh64a893edd2e1083p145fb6jsn72ba086c0b1a'
        }
    })
}

rooter.post('/jokes', (req, res) => {
    res.set("Content-Type", "application/json");
    axios.request(options()).then(function (rev) {
        res.status(200).json({ status: "Succes", code: 200, link: rev.data.body.image })
    }).catch(function (error) {
        res.status(500).json({ status: "Failure", code: 500, msg: "Unable to ReachApi" })
    });
})

module.exports = rooter;