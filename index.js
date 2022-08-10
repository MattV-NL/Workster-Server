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

const db = new Client({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: process.env.POSTGRES_PW,
  database: 'wwadb',
});

db.connect();

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

app.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    `INSERT INTO users (username, password) VALUES ($1, $2)`,
    [username, password],
    (err, res) => {
      console.log(err);
    }
  );
  db.end;
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    `SELECT * FROM users WHERE username = $1 AND password = $2`,
    [username, password],
    (err, result) => {
      if (err) {
        res.send(err);
      }
      if (result.rows.length > 0) {
        res.send(result.rows[0]);
      } else {
        res.send({ message: 'Wrong username and password combination' });
      }
    }
  );
  db.end;
});
