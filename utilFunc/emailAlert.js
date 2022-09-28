const fetchWeatherAlert = require('./fetchWeatherAlert');

const emailAlert = async (pool) => {
  try {
    const response = await pool.query(
      'SELECT email_notifications, user_id, measurement_unit FROM user_settings WHERE email_notifications = true'
    );
    const users = response.rows;
    const getUserInformation = async (user) => {
      const response = await pool.query(
        'SELECT latitude, longitude, user_id FROM work_locations WHERE user_id = $1',
        [user.user_id]
      );
      const storedLocations = await response.rows;

      const responseTwo = await pool.query(
        'SELECT email, user_id, username FROM users WHERE user_id = $1',
        [user.user_id]
      );

      const userEmails = await responseTwo.rows;

      const combinedResponse = storedLocations.map(
        ({ latitude, longitude, user_id }) => {
          const userUnits = users.find((user) => user.user_id === user_id);
          const userCredentials = userEmails.find(
            (user) => user.user_id === user_id
          );

          return {
            latitude,
            longitude,
            user_id,
            unit: userUnits.measurement_unit,
            email: userCredentials.email,
            username: userCredentials.username,
          };
        }
      );

      return combinedResponse;
    };

    const locationsArray = await Promise.all(users.map(getUserInformation));
    let key = 0;
    let locationsMap = new Map();

    locationsArray.map((locationObject) =>
      locationObject.map((location) => {
        key++;
        locationsMap.set(key, location);
      })
    );
    const locations = Array.from([...locationsMap.values()]);

    locations.forEach(
      ({ latitude, longitude, unit, email, username }, index) => {
        fetchWeatherAlert(latitude, longitude, unit, email, username, index);
      }
    );
  } catch (err) {
    console.log(err);
    return;
  }
};

module.exports = emailAlert;
