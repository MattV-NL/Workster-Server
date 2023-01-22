const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);
const storeUserCredentials = require('../authenticationFunc/storeUserCredentials');

const register = async (app, pool, url) => {
  app.post(url, async (req, res) => {
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
};

module.exports = register;
