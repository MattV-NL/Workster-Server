const axios = require('axios');
const app = require('../../src/index');
let server;

beforeAll(async () => {
  server = app.listen(4000);
});

afterAll(async () => {
  server.close();
});

test('testing register endpoint', async () => {
  const response = await axios.post('http://localhost:4000/api/register', {
    username: 'test',
    password: 'test',
    email: 'test@test.test',
    timestamp: 'YYYY-MM-DD HH:mm:ss',
  });
  expect(response.status).toBe(200);
});
