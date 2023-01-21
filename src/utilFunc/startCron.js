const cron = require('node-cron');
const emailAlert = require('../utilFunc/emailAlert');
const deleteExpiredUsers = require('../utilFunc/deleteExpiredUsers');

const startCron = (pool) => {
  cron.schedule('0 */6 * * *', () => {
    emailAlert(pool);
    deleteExpiredUsers(pool, 'users');
  });
};

module.exports = startCron;
