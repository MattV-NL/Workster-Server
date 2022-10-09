const bcrypt = require('bcrypt');

const verifyPassword = async (givenPassword, storedPassword) => {
  if (await bcrypt.compare(storedPassword, givenPassword)) {
    return true;
  } else {
    return false;
  }
};

module.exports = verifyPassword;
