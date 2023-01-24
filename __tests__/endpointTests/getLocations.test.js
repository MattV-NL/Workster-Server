const request = require('supertest');
const app = require('../../src/index');

test('testing getLocations endpoint', async () => {
    const response = await request(app).post('/api/get_locations').send({
        //check at home
    })
})