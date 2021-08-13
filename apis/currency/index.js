var axios = require("axios").default;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.listen(4245, () => {
  console.log("Listening on port 4245.");
});

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

app.post("/currency", (req, res) => {
  res.set("Content-Type", "application/json");
  if (req.body.data.From && req.body.data.To) {
    axios.request(getOpt(req.body.data.From, req.body.data.To, req.body.data.Amount || 1)).then(function (response) {
      res.status(200).json({ status: "Success", code: 200, amount: response.data.amount, currency: response.data.to })
    }).catch(function (error) {
      res.status(500).json({ status: "Failure", code: 500, msg: "Invalid parameters" })
    });
  } else {
    res.status(500).json({ status: "Failure", code: 500, msg: "Invalid parameters" })
  }
})
