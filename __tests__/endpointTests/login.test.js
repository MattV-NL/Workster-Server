const request = require('supertest');
const app = require('../../src/index');

test('testing login endpoint', async () => {
  const response = await request(app).post('/api/login').send({
    username: 'guest',
    password: 'guest',
  });
  expect(response.statusCode).toBe(200);
});
