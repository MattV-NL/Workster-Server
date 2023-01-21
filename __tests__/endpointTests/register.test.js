const request = require('supertest');
const app = require('../../src/index');

test('testing register endpoint', async () => {
  const response = await request(app).post('/api/register').send({
    username: 'test',
    password: 'test',
    email: 'test@test.test',
    timestamp: 'YYYY-MM-DD HH:mm:ss',
  });
  expect(response.statusCode).toBe(200);
});
