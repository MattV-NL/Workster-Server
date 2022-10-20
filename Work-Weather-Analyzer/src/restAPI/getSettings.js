import { SERVER_URL } from '../constants';

export const getSettings = async (
  authStatus,
  setDarkMode,
  setUnits,
  setEmailNotifications,
  setRainConlict,
  setSnowConflict,
  setWindConflict
) => {
  if (await authStatus.auth) {
    const response = await fetch(SERVER_URL.getSettings, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authStatus),
    });
    const returnedData = await response.json();
    setDarkMode(returnedData[0].darkmode_on);
    setUnits(returnedData[0].measurement_unit);
    setEmailNotifications(returnedData[0].email_notifications);
    setRainConlict(returnedData[0].rain_limit);
    setSnowConflict(returnedData[0].snow_limit);
    setWindConflict(returnedData[0].wind_limit);
  } else {
    return;
  }
};
