const millisToDate = require('../../src/utilFunc/millisTodate');

test('should return a date string', () => {
    const millis = Date.now();

    const result = millisToDate(millis);
    expect(result).toBeDefined();
    console.log(result);
})