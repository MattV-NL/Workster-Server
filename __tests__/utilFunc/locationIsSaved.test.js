const locationIsSaved = require('../../src/utilFunc/locationIsSaved');
const { Pool } = require('pg');
jest.mock('pg');

describe('testing cases for locationIsSaved function', () => {
  test('location is saved', async () => {
    const pool = new Pool({});
    const user_id = 0;
    const lon = 0;
    const lat = 0;

    pool.query.mockResolvedValueOnce({
      rows: [{ latitude: lat, longitude: lon }],
    });
    const result = await locationIsSaved(pool, user_id, lat, lon);

    expect(result).toBe(true);
    expect(pool.query).toHaveBeenCalledTimes(1);
  });
  test('location is not saved', async () => {
    const pool = new Pool({});
    const user_id = 0;
    const lon = 0;
    const lat = 0;

    pool.query.mockResolvedValueOnce({
      rows: [{ latitude: 1, longitude: 1 }],
    });
    const result = await locationIsSaved(pool, user_id, lat, lon);

    expect(result).toBe(false);
    expect(pool.query).toHaveBeenCalledTimes(1);
  });
});
