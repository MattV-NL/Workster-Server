const deleteExpiredUsers = async (pool, table) => {
  try {
    const date = Math.floor(Date.now() / 1000);
    await pool.query(
      `DELETE FROM ${table} WHERE is_deleted = true AND (((${date} - deleted_on) / 1440) > 30)`
    );
    return { message: 'successfully deleted row' };
  } catch (err) {
    console.log(err);
    return { message: 'oops something went wrong', error: err };
  }
};

module.exports = deleteExpiredUsers;
