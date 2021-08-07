const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

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

app.get('*', (req, res) => {
  res.send("Bite")
})

app.post("/weather", (req, res) => {
  console.log("jij")
    res.set("Content-Type", "application/json");
    res.status(200).json({
        status: "succes",
        code: 200,
        data: { message: "Success", value: "fait chaud pd"},
    });
})