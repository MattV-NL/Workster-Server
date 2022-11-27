const deleteUser = async (pool, table, targetId, id, isDeleted) => {
  try {
    await pool.query(
      `DELETE FROM ${table} WHERE ${targetId} = $1 AND is_deleted = $2`,
      [id, isDeleted]
    );
    return { message: 'successfully deleted row' };
  } catch (err) {
    console.log(err);
    return { message: 'oops something went wrong', error: err };
  }
};

module.exports = deleteUser;
