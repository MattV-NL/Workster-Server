const updateLastLoginAttempt = async (pool, timestamp, username) => {
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

module.exports = updateLastLoginAttempt;
