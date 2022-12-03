const verifyPassword = require('./verifyPassword');

const recoverAccount = async (res, pool, result, username, password) => {
  const userInfo = result.rows.find((body) => body.username === username);
  try {
    if (verifyPassword(userInfo.password, password)) {
      const isDeleted = false;
      await pool.query('UPDATE users SET is_deleted = $1 WHERE username = $2', [
        isDeleted,
        userInfo.username,
      ]);
      res.send({
        message: 'account recovered',
        successful: true,
      });
    }
  } catch (err) {
    res.send({
      message: 'oops, something went wrong',
      err,
      successful: false,
    });
  }
};

module.exports = recoverAccount;
