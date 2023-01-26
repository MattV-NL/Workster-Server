const app = require('../../src/index');
const axios = require('axios');
jest.mock(axios);

beforeAll(() => {
  app.listen(4000, () => {
    console.log('server started on 4000');
  });
});

afterAll(() => {
  app.close(() => {
    console.log('server closed');
  });
});

test('testing login endpoint, expect 200 status code', async () => {
  const response = await axios.post('http://localhost:4000/api/login', {
    username: 'guest',
    password: 'guest',
  });
  expect(response.statusCode).toBe(200);
});
