const checkForSavedData = require('../utilFunc/checkForSavedData');

const saveSettings = async (app, pool, url) => {
  app.post(url, async (req, res) => {
    const settings = req.body;
    const darkMode = settings.darkMode;
    const units = settings.units;
    const user_id = settings.user_id;
    const email_notifications = settings.emailNotifications;
    const rain_limit = settings.rainConflict;
    const snow_limit = settings.snowConflict;
    const wind_limit = settings.windConflict;
    try {
      if (await checkForSavedData(user_id, pool, 'user_settings')) {
        await pool.query(
          'UPDATE user_settings SET darkmode_on = $1, measurement_unit = $2, email_notifications = $3, rain_limit = $4, snow_limit = $5, wind_limit = $6 WHERE user_id = $7',
          [
            darkMode,
            units,
            email_notifications,
            rain_limit,
            snow_limit,
            wind_limit,
            user_id,
          ]
        );
        res.send({
          message: 'settings updated',
        });
      } else {
        await pool.query(
          'INSERT into user_settings (darkmode_on, measurement_unit, email_notifications, rain_limit, snow_limit, wind_limit, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7)',
          [
            darkMode,
            units,
            email_notifications,
            rain_limit,
            snow_limit,
            wind_limit,
            user_id,
          ]
        );
        res.send({
          message: 'settings save to db',
        });
      }
    } catch (err) {
      console.log(err);
      res.send({
        message: 'oops something went wrong',
        error: err,
      });
    }
  });
};

module.exports = saveSettings;
