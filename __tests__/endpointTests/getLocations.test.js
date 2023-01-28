const app = require('../../src/index');
const axios = require('axios');

let server, agent;

beforeAll(() => {
  console.log('server started');
  server = app.listen(4000);
}, 3000);

afterAll(() => {
  console.log('server closed');
  server.close(() => {});
}, 3000);

test('testing getLocations endpoint', async () => {
  const response = await axios.post('http://localhost:4000/api/get_locations', {
    latitude: 0,
    longitude: 0,
    location_id: 0,
  });

  expect(response.statusCode).toBe(200);
});
