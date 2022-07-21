const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const https = require('https');
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

const lang = 'en';
const units = 'metric';
const key = process.env.API_KEY;
//https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang${lang}
let weatherData;

app.get('/api/weather/:latlon', async (req, res) => {
  const latlon = req.params.latlon.split(',');
  const lat = latlon[0];
  const lon = latlon[1];
  console.log(lat, lon);

  const optionsGet = {
    hostname: 'api.openweathermap.org',
    port: 443,
    path: `/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang${lang}`,
    method: 'GET',
  };

  const request = await https.request(optionsGet, (response) => {
    console.log('success');
    response.on('data', (d) => {
      weatherData += d;
      console.log(weatherData);
    });
  });

  request.on('error', (error) => console.error(error));

  request.end();
});
