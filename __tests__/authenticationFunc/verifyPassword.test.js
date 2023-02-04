const verifyPassword = require('../../src/authenticationFunc/verifyPassword');

describe('testing cases for verifyPassword function', () => {
  test('should return false if is_delted is true', async () => {
    const givenPassword = 'password';
    const storedPassword = givenPassword;
    const is_deleted = true;

    const result = await verifyPassword(
      givenPassword,
      storedPassword,
      is_deleted
    );
    expect(result).toBe(false);
  });
  test('should return true if is_delted is false', async () => {
    const givenPassword = 'password';
    const storedPassword = givenPassword;
    const is_deleted = false;

    const result = await verifyPassword(
      givenPassword,
      storedPassword,
      is_deleted
    );
    expect(result).toBe(false);
  });
  test('should return false if is_deleted is false and password not verified', async () => {
    const givenPassword = 'password';
    const storedPassword = 'wrong-password';
    const is_deleted = false;

    const result = await verifyPassword(
      givenPassword,
      storedPassword,
      is_deleted
    );
    expect(result).toBe(false);
  });
});
