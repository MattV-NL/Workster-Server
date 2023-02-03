const deleteExpiredUsers = async (pool, table) => {
  try {
    const date = Math.floor(Date.now() / 1000);
    await pool.query(
      `DELETE FROM ${table} WHERE is_deleted = true AND (((${date} - deleted_on) / 1440) > 30)`
    );
    return { message: 'successfully deleted row', success: true };
  } catch (err) {
    console.log(err);
    return { message: 'oops something went wrong', success: false, error: err };
  }
};

module.exports = deleteExpiredUsers;
