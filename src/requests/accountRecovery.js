const recoverAccount = require('../authenticationFunc/recoverAccount');

const accountRecovery = async (app, pool, url) => {
  app.post(url, async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    pool.query(
      'SELECT username, password FROM users',
      async (err, result) =>
        await recoverAccount(res, pool, result, username, password)
    );
  });
};

module.exports = accountRecovery;
