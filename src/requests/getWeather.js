const axios = require('axios');
require('dotenv').config();

const lang = 'en';
const key = process.env.API_KEY;

const getWeather = async (app, url) => {
  app.get('/api/weather/:latlonunits', async (req, res) => {
    const [lat, lon, units] = req.params.latlonunits.split(',');
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang${lang}`
    );
    res.send(response.data);
  });
};

module.exports = getWeather;

// function handler(req) {
//   if (!req) {
//     throw Error
//   }

//   const body = req.body

//   if (!body) {
//     throw Error
//   }

//   const [lat, lon, units] = req.params.latlonunits.split(',');

//   if (!lat) { }

//   //...

//   const weather = await WeatherService.getWeather(lat, lon, units)

//   return res.json(weather);
// }
