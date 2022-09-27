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
const deleteRow = require('./utilFunc/deleteRow');
const checkForSavedData = require('./utilFunc/checkForSavedData');
const emailAlert = require('./utilFunc/emailAlert');
const updateLastLoginAttempt = require('./utilFunc/updateLastLogin');

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
emailAlert(pool);
app.use(cors(corsOptions));
app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

const lang = 'en';
const key = process.env.API_KEY;

const locationIsSaved = async (user_id, lon, lat) => {
  const response = await pool.query(
    'SELECT latitude, longitude FROM work_locations WHERE user_id = $1',
    [user_id]
  );
  const checkLat = async (coordinate) => {
    if ((await coordinate.latitude) == lat) {
      return true;
    }
    return false;
  };

  const checkLon = async (coordinate) => {
    if ((await coordinate.longitude) == lon) {
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
      (await checkForSavedData(body.user_id, pool, 'work_locations')) &&
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

app.get('/api/weather/:latlonunits', async (req, resp) => {
  const latlonunits = req.params.latlonunits.split(',');
  const lat = latlonunits[0];
  const lon = latlonunits[1];
  const units = latlonunits[2];
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
            expiresIn: '30m',
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
  updateLastLoginAttempt(pool, timestamp, username);
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
        body.workLocation.location_id,
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

app.get('/get_work_information/:location_id', async (req, res) => {
  const location_id = req.params.location_id;
  const work_information = await pool.query(
    'SELECT * FROM work_information WHERE location_id = $1',
    [location_id]
  );

  res.send(work_information.rows);
});

app.post('/delete_work_information', async (req, res) => {
  const information_id = req.body.information_id;
  res.send(
    await deleteRow(pool, 'work_information', 'information_id', information_id)
  );
});

app.post('/delete_location', async (req, res) => {
  const location_id = req.body.location_id;
  res.send(await deleteRow(pool, 'work_locations', 'location_id', location_id));
});

app.post('/save_settings', async (req, res) => {
  const settings = req.body;
  const darkMode = settings.darkMode;
  const units = settings.units;
  const user_id = settings.user_id;
  const email_notifications = settings.emailNotifications;

  try {
    if (await checkForSavedData(user_id, pool, 'user_settings')) {
      await pool.query(
        'UPDATE user_settings SET darkmode_on = $1, measurement_unit = $2, email_notifications = $3 WHERE user_id = $4',
        [darkMode, units, email_notifications, user_id]
      );
      res.send({
        message: 'settings updated',
      });
    } else {
      await pool.query(
        'INSERT into user_settings (darkmode_on, measurement_unit, email_notifications, user_id) VALUES ($1, $2, $3, $4)',
        [darkMode, units, email_notifications, user_id]
      );
      res.send({
        message: 'settings save to db',
      });
    }
  } catch (err) {
    console.log(err);
    res.send({
      message: 'oops something went wrong',
      error: err,
    });
  }
});

app.post('/get_settings', async (req, res) => {
  const user_id = req.body.user_id;
  try {
    if (await checkForSavedData(user_id, pool, 'user_settings')) {
      const settings = await pool.query(
        'SELECT darkmode_on, measurement_unit, email_notifications FROM user_settings WHERE user_id = $1',
        [user_id]
      );
      res.send(settings.rows);
    } else {
      const defaultResponse = [
        {
          darkmode_on: true,
          measurement_unit: 'metric',
          email_notifications: false,
        },
      ];
      res.send(defaultResponse);
    }
  } catch (err) {
    console.log(err);
    res.send({
      message: 'oops, something went wrong',
      error: err,
    });
  }
});
