const deleteUser = require('./deleteUser');

const checkForDeletedUsers = async (pool) => {
  const response = await pool.query(
    'SELECT * from users WHERE is_deleted = true'
  );
  console.log(response.rows);
  const result = response.rows;

  result.forEach((user) => {
    deleteUser(pool, 'users', 'username', user.username, user.is_deleted);
  });
};

module.exports = checkForDeletedUsers;
