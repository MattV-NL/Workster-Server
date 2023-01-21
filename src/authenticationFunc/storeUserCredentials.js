const bcrypt = require('bcrypt');

const storeUserCredentials = async (
  pool,
  username,
  password,
  email,
  timestamp,
  res
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  pool.query(
    `INSERT INTO users (username, email, password, created_on) VALUES ($1, $2, $3, $4)`,
    [username, email, hashedPassword, timestamp],
    async (err) => {
      if (err) {
        res.send({ message: 'registration failed', status: true, err });
      } else {
        res.send({
          message: 'registration successful',
          status: false,
          successful: true,
        });
      }
    }
  );
};

module.exports = storeUserCredentials;
