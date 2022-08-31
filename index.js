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

const userHasLocation = async (givenUserId) => {
  const response = await pool.query('SELECT user_id FROM work_locations');
  const checkUsers = (storedUser) => {
    if (storedUser.user_id === givenUserId) {
      return true;
    }
    return false;
  };
  if (response.rows.some(checkUsers)) {
    return true;
  } else {
    return false;
  }
};

const locationIsSaved = async (user_id, lon, lat) => {
  const response = await pool.query(
    'SELECT latitude, longitude FROM work_locations WHERE user_id = $1',
    [user_id]
  );
  const checkLat = (coordinate) => {
    if (coordinate.latitude == lat) {
      return true;
    }
    return false;
  };

  const checkLon = (coordinate) => {
    if (coordinate.longitude == lon) {
      return true;
    }
    return false;
  };
  if (response.rows.some(checkLat) && response.rows.some(checkLon)) {
    return true;
  } else {
    false;
  }
};

app.post('/save_location', async (req, res) => {
  const body = req.body;
  try {
    if (
      (await userHasLocation(body.user_id)) &&
      (await locationIsSaved(body.user_id, body.longitude, body.latitude))
    ) {
      res.send({ message: 'location already saved' });
    } else {
      await pool.query(
        'INSERT INTO work_locations (user_id, latitude, longitude) VALUES ($1, $2, $3)',
        [body.user_id, body.lat, body.lon]
      );
      res.send({ message: 'location successfully saved to database' });
    }
  } catch (err) {
    res.send({ message: 'server error', status: 500 });
    console.log(err);
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
      [username, email, hashedPassword, timestamp]
    );
    res.send({ message: 'registration successful' });
  } catch (err) {
    res.status(500).send({ message: 'oops, something went wrong' });
    console.log(err);
  }
});

const verifyPassword = async (givenPassword, storedPassword) => {
  await bcrypt.compare(storedPassword, givenPassword);
};

const updateLastLoginAttempt = async (timestamp, username) => {
  try {
    pool.query('UPDATE users SET last_login_attempt = $1 WHERE username = $2', [
      timestamp,
      username,
    ]);
    console.log({ message: `logged last login attempt for ${username}` });
  } catch (err) {
    console.log(err);
  }
};

app.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const timestamp = dayjs.utc().format('YYYY-MM-DD HH:mm:ss').toString();

  pool.query(
    'SELECT user_id, username, password FROM users',
    async (err, result) => {
      const userInfo = result.rows.find((body) => body.username === username);
      try {
        if (verifyPassword(password, userInfo.password)) {
          const jwtPayload = {
            username: userInfo.username,
            user_id: userInfo.user_id,
          };
          const token = jwt.sign(jwtPayload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: 1000,
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
      } catch (err) {
        console.log(err);
        res.status(500).send();
      }
    }
  );
  updateLastLoginAttempt(timestamp, username);
});

const verifyToken = (req, res, next) => {
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

app.get('/auth_check', verifyToken, (req, res) => {
  res.send({
    auth: true,
    message: 'authentication successful',
    username: req.userId.username,
    user_id: req.userId.user_id,
  });
});

app.post('/get_locations', async (req, res) => {
  const body = req.body;
  try {
    const locations = await pool.query(
      'SELECT latitude, longitude, location_id FROM work_locations WHERE user_id = $1',
      [body.user_id]
    );
    res.send(locations.rows);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ message: 'oops, something went wrong', status: 500 });
  }
});

app.post('/save_work_information', async (req, res) => {
  const body = req.body;
  const timestamp = dayjs.utc().format('YYYY-MM-DD HH:mm:ss').toString();

  try {
    await pool.query(
      'INSERT into work_information (created_at, location_id, date, is_outside, is_welding, is_scaffolding, work_details) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [
        timestamp,
        body.location_id,
        body.date,
        body.isOutside,
        body.isWelding,
        body.isScaffolding,
        body.workDetails,
      ]
    );
    res.send({ message: 'work information logged to database' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'opps something went wrong', error: err });
  }
});
