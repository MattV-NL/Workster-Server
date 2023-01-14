const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
const app = express();
const PORT = process.env.PORT || 8000;
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const { Pool } = require('pg');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);
const deleteRow = require('./utilFunc/deleteRow');
const checkForSavedData = require('./utilFunc/checkForSavedData');
const emailAlert = require('./utilFunc/emailAlert');
const locationIsSaved = require('./utilFunc/locationIsSaved');
const storeUserCredentials = require('./authenticationFunc/storeUserCredentials');
const verifyToken = require('./authenticationFunc/verifyToken');
const attemptLogin = require('./authenticationFunc/attemptLogin');
const cron = require('node-cron');
const recoverAccount = require('./authenticationFunc/recoverAccount');
const deleteExpiredUsers = require('./utilFunc/deleteExpiredUsers');

const corsOptions = {
  origin: 'http://localhost:3000',
};

const pool = new Pool({
  host: process.env.POSTGRES_SERVER || 'localhost',
  user: process.env.POSTGRES_USER,
  port: 5432,
  password: process.env.POSTGRES_PW,
  database: process.env.POSTGRES_USER_DATABASE,
  max: 10,
  connectionTimeoutMillis: 0,
  idleTimeoutMillis: 0,
});

cron.schedule('0 */6 * * *', () => {
  emailAlert(pool);
  deleteExpiredUsers(pool, 'users');
});

const static_dir = path.resolve(
  path.join(__dirname, '../Workster-Client/build')
);
app.use('/', express.static(static_dir));
app.use(cors(corsOptions));
app.use(express.json());
app.get('/*', (req, res, next) => {
  if (req.url.startsWith('/api/')) {
    next();
    return;
  }
  res.sendFile(path.join(static_dir, 'index.html'));
});

// commented out for dev environment
// since cert is on VM
// const certPath = '/etc/letsencrypt/live/workster.app/fullchain.pem';
// const keyPath = '/etc/letsencrypt/live/workster.app/privkey.pem';
// const httpsOptions = {
//   cert: fs.readFileSync(certPath),
//   key: fs.readFileSync(keyPath),
// };
// https.createServer(httpsOptions, app).listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

const lang = 'en';
const key = process.env.API_KEY;

app.post('/api/save_location', async (req, res) => {
  const body = req.body;
  try {
    if (
      (await checkForSavedData(body.user_id, pool, 'work_locations')) &&
      (await locationIsSaved(pool, body.user_id, body.lon, body.lat))
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

app.post('/api/register', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const timestamp = dayjs.utc().format('YYYY-MM-DD HH:mm:ss').toString();
  try {
    storeUserCredentials(pool, username, password, email, timestamp, res);
  } catch (err) {
    res.status(500).send({ message: 'oops, something went wrong' });
    console.log(err);
  }
});

app.post('/api/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const timestamp = dayjs.utc().format('YYYY-MM-DD HH:mm:ss').toString();

  pool.query(
    'SELECT user_id, username, password, is_deleted FROM users',
    async (err, result) =>
      await attemptLogin(err, result, username, password, timestamp, res, pool)
  );
});

app.get('/api/auth_check', verifyToken, (req, res) => {
  res.send({
    auth: true,
    message: 'authentication successful',
    username: req.userId.username,
    user_id: req.userId.user_id,
  });
});

app.post('/api/get_locations', async (req, res) => {
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

app.post('/api/save_work_information', async (req, res) => {
  const body = req.body;
  const timestamp = dayjs.utc().format('YYYY-MM-DD HH:mm:ss').toString();
  const date = body.date + ' 00:00:00';

  try {
    await pool.query(
      'INSERT into work_information (created_at, location_id, date, is_outside, is_welding, is_scaffolding, work_details) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [
        timestamp,
        body.workLocation.location_id,
        date,
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

app.get('/api/get_work_information/:location_id', async (req, res) => {
  const location_id = req.params.location_id;
  const work_information = await pool.query(
    'SELECT * FROM work_information WHERE location_id = $1',
    [location_id]
  );

  res.send(work_information.rows);
});

app.post('/api/delete_work_information', async (req, res) => {
  const information_id = req.body.information_id;
  res.send(
    await deleteRow(pool, 'work_information', 'information_id', information_id)
  );
});

app.post('/api/delete_location', async (req, res) => {
  const location_id = req.body.location_id;
  res.send(await deleteRow(pool, 'work_locations', 'location_id', location_id));
});

app.post('/api/save_settings', async (req, res) => {
  const settings = req.body;
  const darkMode = settings.darkMode;
  const units = settings.units;
  const user_id = settings.user_id;
  const email_notifications = settings.emailNotifications;
  const rain_limit = settings.rainConflict;
  const snow_limit = settings.snowConflict;
  const wind_limit = settings.windConflict;
  try {
    if (await checkForSavedData(user_id, pool, 'user_settings')) {
      await pool.query(
        'UPDATE user_settings SET darkmode_on = $1, measurement_unit = $2, email_notifications = $3, rain_limit = $4, snow_limit = $5, wind_limit = $6 WHERE user_id = $7',
        [
          darkMode,
          units,
          email_notifications,
          rain_limit,
          snow_limit,
          wind_limit,
          user_id,
        ]
      );
      res.send({
        message: 'settings updated',
      });
    } else {
      await pool.query(
        'INSERT into user_settings (darkmode_on, measurement_unit, email_notifications, rain_limit, snow_limit, wind_limit, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [
          darkMode,
          units,
          email_notifications,
          rain_limit,
          snow_limit,
          wind_limit,
          user_id,
        ]
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

app.post('/api/get_settings', async (req, res) => {
  const user_id = req.body.user_id;
  try {
    if (await checkForSavedData(user_id, pool, 'user_settings')) {
      const settings = await pool.query(
        'SELECT darkmode_on, measurement_unit, email_notifications, rain_limit, snow_limit, wind_limit FROM user_settings WHERE user_id = $1',
        [user_id]
      );
      res.send(settings.rows);
    } else {
      const defaultResponse = [
        {
          darkmode_on: true,
          measurement_unit: 'metric',
          email_notifications: false,
          rain_limit: 20,
          snow_limit: 20,
          wind_limit: 30,
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

app.post('/api/soft_delete_account', async (req, res) => {
  const user_id = req.body.user_id;
  const deleted = true;
  const date = Math.floor(Date.now() / 1000);
  await pool.query(
    'UPDATE users SET is_deleted = $1, deleted_on = $2 WHERE user_id = $3',
    [deleted, date, user_id]
  );
  res.send({
    message:
      'account has been deleted. If you change your mind your account can be recovered at anytime in the next 30 days.',
  });
});

app.post('/api/recover_account', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  pool.query(
    'SELECT username, password FROM users',
    async (err, result) =>
      await recoverAccount(res, pool, result, username, password)
  );
});
