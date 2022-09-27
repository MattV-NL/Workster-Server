require('dotenv').config();
const axios = require('axios');

const key = process.env.API_KEY;
const lang = 'en';
const fetchWeatherAlert = async (lat, lon, unit, index) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=${unit}&lang${lang}`
  );
  console.log(response.data.alerts, index);
};

module.exports = fetchWeatherAlert;
