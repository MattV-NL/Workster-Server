const verifyPassword = require('./verifyPassword');
const updateLastLoginAttempt = require('./updateLastLogin');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

const attemptLogin = async (
  err,
  result,
  username,
  password,
  timestamp,
  res,
  pool
) => {
  const userInfo = result.rows.find((body) => body.username === username);
  try {
    if (userInfo) {
      if (
        await verifyPassword(userInfo.password, password, userInfo.is_deleted)
      ) {
        const jwtPayload = {
          username: userInfo.username,
          user_id: userInfo.user_id,
        };
        const token = jwt.sign(jwtPayload, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '30m',
        });
        res.json({
          message: 'login successful',
          auth: true,
          last_login_attempt: timestamp,
          token: token,
          credentialsNotMatch: false,
          userNotFound: false,
          loginMessageModal: false,
        });
        await updateLastLoginAttempt(pool, timestamp, username);
      } else {
        res.send({
          message: 'wrong username and password combination',
          auth: false,
          userNotFound: false,
          loginMessageModal: true,
        });
      }
    } else {
      res.send({
        message: 'user not found',
        auth: false,
        userNotFound: true,
        loginMessageModal: true,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};
module.exports = attemptLogin;
