export const deleteExpiredUsers = async (pool, table) => {
  try {
    const date = Math.floor(Date.now() / 1000);
    const response = await pool.query(
      `DELETE FROM ${table} WHERE is_deleted = true AND (((${date} - deleted_on) / 1440) > 30)`
    );
    if (response.rowCount > 0) {
      return { message: 'users deleted', pass: true };
    } else {
      return { message: 'no deleted users found', pass: false };
    }
  } catch (err) {
    console.log(err);
  }
};
