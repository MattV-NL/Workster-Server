const attemptLogin = require('../authenticationFunc/attemptLogin');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

const login = (app, pool, url) => {
  app.post(url, async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const timestamp = dayjs.utc().format('YYYY-MM-DD HH:mm:ss').toString();

    pool.query(
      'SELECT user_id, username, password, is_deleted FROM users',
      async (err, result) =>
        await attemptLogin(
          err,
          result,
          username,
          password,
          timestamp,
          res,
          pool
        )
    );
  });
};

module.exports = login;
