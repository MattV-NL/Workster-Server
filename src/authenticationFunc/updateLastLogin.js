export const updateLastLoginAttempt = async (pool, timestamp, username) => {
  try {
    pool.query('UPDATE users SET last_login_attempt = $1 WHERE username = $2', [
      timestamp,
      username,
    ]);
    return {
      message: `updated last login attempt for ${username}`,
      pass: true,
    };
  } catch (err) {
    return {
      message: `updated last login attempt for ${username} FAILED`,
      pass: false,
    };
  }
};
