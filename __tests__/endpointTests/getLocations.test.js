const axios = require('axios');
const app = require('../../src/index');
let server;

beforeAll(async () => {
  server = app.listen(4000);
});

afterAll(async () => {
  server.close();
});

test('testing getLocations endpoint', async () => {
  const response = await axios.post('http://localhost:4000/api/get_locations', {
    latitude: 0,
    longitude: 0,
    location_id: 0,
  });

  expect(response.status).toBe(200);
});
