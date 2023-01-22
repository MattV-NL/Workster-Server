import bcrypt from 'bcrypt';

export const verifyPassword = async (
  givenPassword,
  storedPassword,
  is_deleted
) => {
  if (is_deleted) {
    return false;
  } else if (await bcrypt.compare(storedPassword, givenPassword)) {
    return true;
  } else {
    return false;
  }
};
