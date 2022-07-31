const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const { Client } = require('pg');

const corsOptions = {
  origin: 'http://localhost:3000',
};

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: 'tinker',
  database: 'wwadb',
});

client.connect();

client.query(`Select * from users`, (err, res) => {
  if (!err) {
    console.log(res);
  } else {
    console.error(err);
  }
  client.end;
});

app.use(cors(corsOptions));
app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

const lang = 'en';
const units = 'metric';
const key = process.env.API_KEY;

app.get('/api/weather/:latlon', async (req, resp) => {
  const latlon = req.params.latlon.split(',');
  const lat = latlon[0];
  const lon = latlon[1];
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang${lang}`
    );
    resp.send(response.data);
  } catch (err) {
    resp.send({
      message: 'server error',
      status: 500,
    });
    console.error(err);
  }
});
