jest.mock('pg');
import deleteExpiredUsers from '../../utilFunc/deleteExpiredUsers.js';
import pg from 'pg';

test('should return true if there are users to be deleted', async () => {
  const table = 'test';
  const pool = new pg.Pool({});
  pool.query.mockResolvedValueOnce({ rowCount: 0 });
  const result = await deleteExpiredUsers(pool, table);
  expect(result.pass).toBe(false);
});
