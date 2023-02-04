const checkForSavedData = require('../../src/utilFunc/checkForSavedData');
const { Pool } = require('pg');
jest.mock('pg');

describe('testing cases for checkForSavedData function', () => {
  test('should return true if saved data exists', async () => {
    const targetTable = 'test';
    const givenUserId = 0;
    const pool = new Pool({});
    pool.query.mockResolvedValueOnce({ rows: [{ user_id: givenUserId }] });
    const result = await checkForSavedData(givenUserId, pool, targetTable);
    expect(result).toBe(true);
    // check mocks
    expect(pool.query).toHaveBeenCalledTimes(1);
    expect(pool.query).toHaveBeenLastCalledWith(
      `SELECT user_id FROM ${targetTable}`
    );
  });
  test('should return false if no saved data exists', async () => {
    const targetTable = 'table';
    const givenUserId = 0;
    const pool = new Pool({});
    pool.query.mockResolvedValueOnce({ rows: [] });
    const result = await checkForSavedData(givenUserId, pool, targetTable);
    expect(result).toBe(false);
  });
});
