var axios = require("axios").default;
const express = require('express');
const app = express();
const weather = require('./routes/weather');
const youtube = require('./routes/youtube');
const currency = require('./routes/currency');
const widgets = require('./routes/availables');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/", weather,youtube, widgets, currency);
app.listen(4244, () => { console.log("Listening on port 4244."); });
app.use("/", weather,youtube, widgets, currency);