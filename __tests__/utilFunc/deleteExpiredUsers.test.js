const deleteExpiredUsers = require('../../src/utilFunc/deleteExpiredUsers');
const { Pool } = require('pg');
jest.mock('pg');

test('should return true if sucessfully deleted user', async () => {
  const pool = new Pool({});
  const table = 'test';
  const result = await deleteExpiredUsers(pool, table);
  expect(result.success).toBe(true);
});
