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
const jwt = require('jsonwebtoken');

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

app.post('/saveLocation', async (req, res) => {
  const data = req.body;
  try {
    pool.query(
      'INSERT INTO work_locations (user_id, latitude, longitude) VALUES ($1, $2, $3)',
      [data.user_id, data.lat, data.lon],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
        }
      }
    );
    res.send({ message: 'location successfully logged to database' });
  } catch (err) {
    res.send({
      message: 'server error',
      status: 500,
    });
    console.error(err);
  }
});

app.get('/api/weather/:latlon', async (req, resp) => {
  const latlon = req.params.latlon.split(',');
  const lat = latlon[0];
  const lon = latlon[1];
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang${lang}`
  );
  resp.send(response.data);
});

app.post('/register', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const timestamp = dayjs.utc().format('YYYY-MM-DD HH:mm:ss').toString();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    pool.query(
      `INSERT INTO users (username, email, password, created_on) VALUES ($1, $2, $3, $4)`,
      [username, email, hashedPassword, timestamp],
      (err, result) => {
        if (err) {
          console.log(err);
        }
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

  pool.query(
    'SELECT user_id, username, password FROM users',
    async (err, result) => {
      const user = result.rows.find((user) => user.username === username);
      if (err) {
        console.log(err);
      }
      try {
        const checkPassword = await bcrypt.compare(password, user.password);
        if (checkPassword) {
          const id = { username: user.username, user_id: user.user_id };
          const token = jwt.sign(id, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: 300,
          });

          res.json({
            message: 'login successful',
            auth: true,
            last_login_attempt: timestamp,
            token: token,
          });
        } else {
          res.send({
            massage: 'wrong username and password combination',
            auth: false,
            last_login_attempt: timestamp,
          });
        }
      } catch {
        console.log(err);
        res.status(500).send();
      }
    }
  );
  pool.query(
    'UPDATE users SET last_login_attempt = $1 WHERE username = $2',
    [timestamp, username],
    async (err, result) => {
      if (err) {
        res.send(err);
      } else {
        console.log({
          message: `logged last_login_attempt for ${username}`,
        });
      }
    }
  );
});

const verifyJWT = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    res.send({ message: 'no authorization token found' });
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.send({ auth: false, message: 'failed to authenticate' });
      } else {
        req.userId = decoded;
        next();
      }
    });
  }
};

app.get('/authCheck', verifyJWT, (req, res) => {
  res.send({
    auth: true,
    message: 'authentication successful',
    username: req.userId.username,
    user_id: req.userId.user_id,
  });
});
