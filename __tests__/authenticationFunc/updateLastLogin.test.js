jest.mock('pg');
import { updateLastLoginAttempt } from '../../src/authenticationFunc/updateLastLogin.js';
import pg from 'pg';
import dayjs from 'dayjs';

test('Should return message saying updated last login attempt', async () => {
  const username = 'username';
  const timestamp = dayjs.utc.format('YYYY-MM-DD HH:mm:ss').toString();
  const pool = new pg.Pool({});

  const result = await updateLastLoginAttempt(pool, timestamp, username);
  expect(result).toBe(false);
});
