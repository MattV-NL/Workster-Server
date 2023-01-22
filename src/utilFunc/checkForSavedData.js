export const checkForSavedData = async (givenUserId, pool, targetTable) => {
  const response = await pool.query(`SELECT user_id FROM ${targetTable}`);
  const checkUsers = (storedUser) => {
    if (storedUser.user_id === givenUserId) {
      return true;
    }
    return false;
  };
  if (await response.rows.some(checkUsers)) {
    return true;
  } else {
    return false;
  }
};
