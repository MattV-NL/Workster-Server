const request = require('supertest');
const app = require('../../src/index');

let server, agent;

beforeEach((done) => {
  server = app.listen(4000);
  agent = request.agent(server);
  done();
});

afterEach(() => {
  server.close();
});

test('testing getLocations endpoint', async () => {
  const response = await agent.post('/api/get_locations').send([
    {
      latitude: 0,
      longitude: 0,
      location_id: 0,
    },
  ]);
  expect(response.statusCode).toBe(200);
  agent;
});
