import jest from 'jest';
import locationIsSaved from '../../utilFunc/locationIsSaved.js';
import pg from 'pg';

jest.mock('pg');

test('should return true if location is saved', async () => {
  const user_id = 0;
  const lat = 0;
  const lon = 0;
  const pool = new pg.Pool({});
  pool.query.mockResolvedValueOnce({
    rows: [{ latitude: lat, longitude: lon }],
  });

  const result = await locationIsSaved(pool, user_id, lat, lon);
  expect(result).toBe(true);
});
