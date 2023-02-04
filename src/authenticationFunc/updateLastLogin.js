const updateLastLoginAttempt = async (pool, timestamp, username) => {
  try {
    pool.query('UPDATE users SET last_login_attempt = $1 WHERE username = $2', [
      timestamp,
      username,
    ]);
    return {
      message: `logged last login attempt for ${username}`,
      success: true,
    };
  } catch (err) {
    console.log(err);
    return {
      message: 'oops something went wrong',
      success: false,
    };
  }
};

module.exports = updateLastLoginAttempt;
