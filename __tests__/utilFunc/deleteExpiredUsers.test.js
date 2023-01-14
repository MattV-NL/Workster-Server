jest.mock('pg');
const deleteExpiredUsers = require('../../utilFunc/deleteExpiredUsers');
const { Pool } = require('pg');

test('should return true if there are users to be deleted', async () => {
  const table = 'test';
  const pool = new Pool({});
  pool.query.mockResolvedValueOnce({ rowCount: 0 });
  const result = await deleteExpiredUsers(pool, table);
  expect(result.pass).toBe(false);
});
