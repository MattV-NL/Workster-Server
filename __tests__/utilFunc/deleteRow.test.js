jest.mock('pg');
const deleteRow = require('../../utilFunc/deleteRow');
const { Pool } = require('pg');

test('shuold return true if a row was deleted', async () => {
  const table = 'test';
  const targetId = 0;
  const id = 0;
  const pool = new Pool({});
  pool.query.mockResolvedValueOnce({ rowCount: 1 });

  const result = await deleteRow(pool, table, targetId, id);
  expect(result.pass).toBe(true);
});
