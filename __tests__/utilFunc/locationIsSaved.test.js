jest.mock('pg');
const locationIsSaved = require('../../utilFunc/locationIsSaved');
const { Pool } = require('pg');

test('should return true if location is saved', async () => {
  const user_id = 0;
  const lat = 0;
  const lon = 0;
  const pool = new Pool({});
  pool.query.mockResolvedValueOnce({
    rows: [{ latitude: lat, longitude: lon }],
  });

  const result = await locationIsSaved(pool, user_id, lat, lon);
  expect(result).toBe(true);
});
