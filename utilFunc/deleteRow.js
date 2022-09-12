const deleteRow = async (pool, table, targetId, id) => {
  try {
    await pool.query(`DELETE FROM ${table} WHERE ${targetId} = $1`, [id]);
    return { message: 'successfully deleted row' };
  } catch (err) {
    console.log(err);
    return { message: 'oops something went wrong', error: err };
  }
};

module.exports = deleteRow;
