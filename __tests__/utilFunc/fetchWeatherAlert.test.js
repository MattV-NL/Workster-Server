jest.mock('axios');
jest.mock('@sendgrid/mail');
const client = require('@sendgrid/mail');
const { default: axios } = require('axios');
client.setApiKey('testString');
const millisToDate = require('../../utilFunc/millisToDate');
const key = 'testKey';
const lang = 'testLang';
test('should return true if there is a weather alert', async () => {
  const lat = 0;
  const lon = 0;
  const unit = 'string';

  const response = await axios.get().to;
});
