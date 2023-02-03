const deleteRow = require('../../src/utilFunc/deleteRow');
const { Pool } = require('pg');
jest.mock('pg');

test('should return true', async () => {
  const pool = new Pool({});
  const table = 'test';
  const targetId = 'targetId';
  const id = 0;

  const result = await deleteRow(pool, table, targetId, id);
  expect(result.success).toBe(true);
});
