const checkForSavedData = require('../utilFunc/checkForSavedData');

const getSettings = async (app, pool, url) => {
  app.post(url, async (req, res) => {
    const user_id = req.body.user_id;
    try {
      if (await checkForSavedData(user_id, pool, 'user_settings')) {
        const settings = await pool.query(
          'SELECT darkmode_on, measurement_unit, email_notifications, rain_limit, snow_limit, wind_limit FROM user_settings WHERE user_id = $1',
          [user_id]
        );
        res.send(settings.rows);
      } else {
        const defaultResponse = [
          {
            darkmode_on: true,
            measurement_unit: 'metric',
            email_notifications: false,
            rain_limit: 20,
            snow_limit: 20,
            wind_limit: 30,
          },
        ];
        res.send(defaultResponse);
      }
    } catch (err) {
      console.log(err);
      res.send({
        message: 'oops, something went wrong',
        error: err,
      });
    }
  });
};

module.exports = getSettings;
