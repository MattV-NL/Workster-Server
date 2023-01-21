const verifyToken = require('../authenticationFunc/verifyToken');

const authCheck = async (app, url) => {
  app.get(url, verifyToken, (req, res) => {
    res.send({
      auth: true,
      message: 'authentication successful',
      username: req.userId.username,
      user_id: req.userId.user_id,
    });
  });
};

module.exports = authCheck;
