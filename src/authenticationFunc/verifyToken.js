const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    res.send({ message: 'no authorization token found' });
    return {
      message: 'no token found',
      success: false,
    };
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.send({ auth: false, message: 'failed to authenticate' });
        return {
          message: 'failed to authenticate',
          success: false,
        };
      } else {
        req.userId = decoded;
        next();
        return {
          message: 'token authenticated',
          success: true,
        };
      }
    });
  }
};

module.exports = verifyToken;
