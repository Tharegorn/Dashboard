const axios = require('axios');
exports.city = function (req, res) {
  if (req.query.city) {
    const option = {
      method: "GET",
      url: "https://api.openweathermap.org/data/2.5/weather",
      params: {
        q: req.query.city,
        appid: process.env.WEATHER_KEY,
        units: "metric",
        lang: "en",
      },
    };
    axios.request(option).then(function (rev) {
        res.status(200).json({ status: "Succes", code: 200, city: rev.data.name, temp: rev.data.main.temp, desc: rev.data.weather[0].description })
    }).catch(function (error) {
        res.status(500).json({ status: "Failure", code: 500, msg: "Unknow City" })
    });
  } else res.status(401).json({status: "Invalid Parameters", code: 401})
};
