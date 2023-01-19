jest.mock('pg');
import checkForSavedData from '../../utilFunc/checkForSavedData.js';
import pg from 'pg';

test('should return true if saved data exists', async () => {
  const targetTable = 'test';
  const givenUserId = 0;
  //   const pool = {
  //     query: () => {
  //       return {
  //         rows: [
  //           {
  //             user_id: givenUserId,
  //           },
  //         ],
  //       };
  //     },
  //   };
  const pool = new pg.Pool({});
  pool.query.mockResolvedValueOnce({ rows: [{ user_id: givenUserId }] });
  const result = await checkForSavedData(givenUserId, pool, targetTable);
  // check return value
  expect(result).toBe(true);
  // check mocks
  expect(pool.query).toHaveBeenCalledTimes(1);
  expect(pool.query).toHaveBeenLastCalledWith(
    `SELECT user_id FROM ${targetTable}`
  );
});
