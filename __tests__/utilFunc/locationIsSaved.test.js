const locationIsSaved = require('../../src/utilFunc/locationIsSaved');
const { Pool } = require('pg');
jest.mock('pg');

test('run test', async () => {
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
  expect(pool.query).toHaveBeenLastCalledWith(
    'SELECT latitude, longitude FROM work_locations WHERE user_id = $1'
  );
});
