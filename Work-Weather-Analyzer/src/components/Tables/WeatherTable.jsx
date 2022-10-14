import { useContext, useCallback, useState } from 'react';
import { WeatherDataContext } from '../../contexts/WeatherDataContext';
import './tables.scss';
import { Table } from 'antd';
import { weatherTableColumns } from '../../constants';
import WeatherDetailsModal from '../Modals/WeatherDetailsModal';
import { DateTime } from 'luxon';
import { UserSettingsContext } from '../../contexts/UserSettingsContext';

const WeatherTable = () => {
  const { darkMode, units } = useContext(UserSettingsContext);
  const { weatherValues, setIsWeatherDetailsVisible } =
    useContext(WeatherDataContext);
  const weatherValuesKeys = weatherValues.keys();
  const [weatherDetailsKey, setWeatherDetailsKey] = useState('');

  const columns = Array.from(weatherTableColumns.values());
  const datasource = Array.from(weatherValues.values()).map(
    ({ dt, pop, wind_speed }, index) => {
      const detailsKey = weatherValuesKeys.next().value;
      const date = new Date(dt * 1000).toDateString();
      const precip = pop * 100;
      let windSpeed = wind_speed;
      let speedUnit = 'km/hr';
      if (units === 'metric' || units === 'standard') {
        windSpeed = wind_speed * 3.6;
      } else if (units === 'imperial') {
        speedUnit = 'mi/hr';
      }
      const details = (
        <>
          <div
            onClick={() => {
              setWeatherDetailsKey(detailsKey);
              setIsWeatherDetailsVisible(true);
            }}
          >
            More Details...
          </div>
        </>
      );
      return {
        date,
        precip: precip.toFixed(2),
        windSpeed: `${windSpeed.toFixed(2)} ${speedUnit}`,
        details,
        key: index,
      };
    }
  );

  const weatherDetails = useCallback(
    (key, units) => {
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
            <li>
              Precentage Chance of Precipitation: {weatherData.pop * 100}%
            </li>
          </ul>
        );
      }
    },
    [weatherValues]
  );

  return (
    <div className={darkMode ? 'dark-weather-table' : 'light-weather-table'}>
      <Table dataSource={datasource} columns={columns} />
      {weatherValues.size === 0 ? (
        ''
      ) : (
        <WeatherDetailsModal title={`Weather Details`}>
          {weatherDetails(weatherDetailsKey, units)}
        </WeatherDetailsModal>
      )}
    </div>
  );
};

export default WeatherTable;
