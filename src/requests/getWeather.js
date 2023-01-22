const axios = require('axios');
require('dotenv').config();

const lang = 'en';
const key = process.env.API_KEY;

const getWeather = async (app, url) => {
  app.get('/api/weather/:latlonunits', async (req, res) => {
    const latlonunits = req.params.latlonunits.split(',');
    const lat = latlonunits[0];
    const lon = latlonunits[1];
    const units = latlonunits[2];
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang${lang}`
    );
    res.send(response.data);
  });
};

module.exports = getWeather;
