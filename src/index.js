const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { Pool } = require('pg');
const login = require('./requests/login');
const register = require('./requests/register');
const authCheck = require('./requests/authCheck');
const getLocations = require('./requests/getLocations');
const saveWorkInformation = require('./requests/saveWorkInformation');
const saveLocation = require('./requests/saveLocation');
const getWeather = require('./requests/getWeather');
const getWorkInformation = require('./requests/getWorkInformation');
const deleteWorkInformation = require('./requests/deleteWorkInformation');
const deleteLocation = require('./requests/deleteLocation');
const saveSettings = require('./requests/saveSettings');
const getSettings = require('./requests/getSettings');
const softDeleteAccount = require('./requests/softDeleteAccount');
const accountRecovery = require('./requests/accountRecovery');
const startCron = require('./utilFunc/startCron');

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

const static_dir = path.resolve(
  path.join(__dirname, '../../Workster-Client/build')
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

startCron(pool);
saveLocation(app, pool, '/api/save_location');
getWeather(app, '/api/weather/:latlonunits');
register(app, pool, '/api/register');
login(app, pool, '/api/login');
authCheck(app, '/api/auth_check');
getLocations(app, pool, '/api/get_locations');
saveWorkInformation(app, pool, '/api/save_work_information');
getWorkInformation(app, pool, '/api/get_work_information/:location_id');
deleteWorkInformation(app, pool, '/api/delete_work_information');
deleteLocation(app, pool, '/api/delete_location');
saveSettings(app, pool, '/api/save_settings');
getSettings(app, pool, '/api/get_settings');
softDeleteAccount(app, pool, '/api/soft_delete_account');
accountRecovery(app, pool, '/api/recover_account');

module.exports = app;
