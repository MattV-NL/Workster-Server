const updateLastLoginAttempt = require('../../src/authenticationFunc/updateLastLogin');
const { Pool } = require('pg');
jest.mock('pg');

describe('testing cases fro updateLastLoginAttempt function', () => {
  test('should return true if last login atttempt was logged', async () => {
    const pool = new Pool({});
    const timestamp = 0;
    const username = 'username';

    const result = await updateLastLoginAttempt(pool, timestamp, username);
    expect(result.success).toBe(true);
  });
});
