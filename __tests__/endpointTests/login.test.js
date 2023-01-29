const axios = require('axios');

const app = require('../../src/index');
let server;

beforeAll(async () => {
  server = app.listen(4000);
});

afterAll(async () => {
  server.close();
});

test('testing login endpoint', async () => {
  const response = await axios.post('http://localhost:4000/api/login', {
    username: 'guest',
    password: 'guest',
  });
  expect(response.status).toBe(200);
});
