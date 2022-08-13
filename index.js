const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const { Pool } = require('pg');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);
const bcrypt = require('bcrypt');

const corsOptions = {
  origin: 'http://localhost:3000',
};

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: process.env.POSTGRES_PW,
  database: 'wwadb',
  max: 10,
  connectionTimeoutMillis: 0,
  idleTimeoutMillis: 0,
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

app.post('/register', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const timestamp = dayjs.utc().format('YYYY-MM-DD HH:mm:ss').toString();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const results = await pool.query(
      `INSERT INTO users (username, email, password, created_on) VALUES ($1, $2, $3, $4)`,
      [username, email, hashedPassword, timestamp],
      (err, result) => {
        console.log(err);
      }
    );
    res.send({ message: 'registration successful' });
  } catch {
    res.status(500).send();
  }
});

app.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const timestamp = dayjs.utc().format('YYYY-MM-DD HH:mm:ss').toString();

  const getPassword = await pool.query(
    'SELECT username, password FROM users',
    (err, result) => {
      const user = result.rows.find((user) => user.username === username);
      if (err) {
        res.send(err);
      }
      try {
        const check = bcrypt.compare(user.password, password);
        if (check) {
          res.send({ message: 'login successful' });
        } else {
          res.send('wrong username and password combination');
        }
      } catch {
        res.status(500).send();
      }
    }
  );

  const results = await pool.query(
    'UPDATE users SET last_login = $1 WHERE username = $2 AND password = $3;',
    [timestamp, username, password],
    (err, result) => {
      if (err) {
        res.send(err);
      } else if (result.rowCount === 1) {
        res.send({ message: 'login successful' });
      } else {
        res.send({
          message: 'Wrong username and password combination',
        });
      }
    }
  );
});
