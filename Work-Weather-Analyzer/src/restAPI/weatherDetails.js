import { DateTime } from 'luxon';

export const weatherDetails = (key, units, weatherValues) => {
  if (!key) {
    return 'no details yet, please enter location information to retrieve the weather details';
  } else {
    const weatherData = weatherValues.get(parseInt(key));
    const getTime = (millis) =>
      new DateTime.fromMillis(millis * 1000).toLocaleString(
        DateTime.TIME_SIMPLE
      );
    const getWindSpeed = (wind) => {
      if (units === 'metric' || units === 'standard') {
        return `${parseFloat((wind * 3.6).toFixed(2))}km/hr`;
      } else {
        return `${parseFloat(wind.toFixed(2))}mi/hr`;
      }
    };
    const getTemp = (temp) => {
      if (units === 'metric') {
        return `${temp}\u00b0C`;
      } else if (units === 'standard') {
        return `${temp}K`;
      } else {
        return `${temp}\u00b0F`;
      }
    };
    const getPrecip = (precip) => {
      if (!precip) {
        return 0;
      } else {
        return precip;
      }
    };
    return (
      <ul>
        <li>Sunrise: {getTime(weatherData.sunrise)}</li>
        <li>Sunset: {getTime(weatherData.sunset)}</li>
        <li>Humidity: {weatherData.humidity}%</li>
        <li>Dewpoint: {getTemp(weatherData.dew_point)}</li>
        <li>Morning Temperature: {getTemp(weatherData.feels_like.morn)}</li>
        <li>Day Temperature: {getTemp(weatherData.feels_like.day)}</li>
        <li>Evening Temperature: {getTemp(weatherData.feels_like.eve)}</li>
        <li>Night Temperature: {getTemp(weatherData.feels_like.night)}</li>
        <li>Wind Direction: {weatherData.wind_deg}&#176;</li>
        <li>Wind Speed: {getWindSpeed(weatherData.wind_speed)}</li>
        <li>Precentage Chance of Precipitation: {weatherData.pop * 100}%</li>
        <li>Rainfall Amount: {getPrecip(weatherData.rain)}mm</li>
        <li>Snowfall Amount: {getPrecip(weatherData.snow)}mm</li>
      </ul>
    );
  }
};
