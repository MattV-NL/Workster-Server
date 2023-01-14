const deleteRow = async (pool, table, targetId, id) => {
  const response = await pool.query(
    `DELETE FROM ${table} WHERE ${targetId} = $1`,
    [id]
  );
  if (response.rowCount > 0) {
    return { message: 'successfully deleted row', pass: true };
  }
};

module.exports = deleteRow;
