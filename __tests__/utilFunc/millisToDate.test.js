const millisToDate = require('../../src/utilFunc/millisToDate');

test('should return a date string', () => {
  const millis = Date.now();

  const result = millisToDate(millis);
  expect(result).toBeDefined();
});
