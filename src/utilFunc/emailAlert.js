const fetchWeatherAlert = require('./fetchWeatherAlert');

const emailAlert = async (pool) => {
  try {
    const response = await pool.query(
      'SELECT email_notifications, user_id, measurement_unit FROM user_settings WHERE email_notifications = true'
    );
    const users = response.rows;

    const getUserInformation = async (user) => {
      const response = await pool.query(
        'SELECT work_locations.latitude, work_locations.longitude, users.username, users.email FROM work_locations INNER JOIN users ON users.user_id = work_locations.user_id WHERE users.user_id = $1',
        [user.user_id]
      );
      const storedLocations = await response.rows;

      return storedLocations;
    };

    const locations = await Promise.all(users.map(getUserInformation));

    locations
      .flat()
      .forEach(({ latitude, longitude, unit, email, username }, index) => {
        fetchWeatherAlert(latitude, longitude, unit, email, username, index);
      });

    return {
      message: 'checked for email alerts for users',
      success: true,
    };
  } catch (err) {
    console.log(err);
    return {
      message: 'oops something went wrong',
      success: false,
      error: err,
    };
  }
};

module.exports = emailAlert;
