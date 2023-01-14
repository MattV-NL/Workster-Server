const millisToDate = require('../../utilFunc/millisToDate');
test('should return date string', () => {
  const millis = 1673711905405;
  const result = millisToDate(millis);
  expect(result).toBeTruthy();
});
