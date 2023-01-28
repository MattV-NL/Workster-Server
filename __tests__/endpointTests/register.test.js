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

test('testing register endpoint', async () => {
  const response = await axios.post('/api/register', {
    username: 'test',
    password: 'test',
    email: 'test@test.test',
    timestamp: 'YYYY-MM-DD HH:mm:ss',
  });
  expect(response.statusCode).toBe(200);
});
