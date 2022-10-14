import { useContext } from 'react';
import { WeatherDataContext } from '../../contexts/WeatherDataContext';
import { DualAxes } from '@ant-design/plots';
import './charts.scss';
import { UserSettingsContext } from '../../contexts/UserSettingsContext';

const WeatherChart = () => {
  const { weatherValues } = useContext(WeatherDataContext);
  const { darkMode } = useContext(UserSettingsContext);

  const data = Array.from(weatherValues.values()).map(
    ({ dt, pop, wind_speed }, index) => {
      const date = new Date(dt * 1000).toDateString();
      const precip = pop * 100;
      const windSpeed = wind_speed * 3.6;

      return {
        date,
        precip,
        windSpeed,
        key: index,
      };
    }
  );

  const config = {
    data: [data, data],
    xField: 'date',
    yField: ['precip', 'windSpeed'],
    geometryOptions: [
      {
        geometry: 'line',
        color: '#5B8FF9',
      },
      {
        geometry: 'line',
        color: '#5AD8A6',
      },
    ],
    xAxis: {
      label: {
        position: 'bottom',
        style: {
          fill: `${darkMode ? '#fff' : '#000'}`,
          fontSize: 12,
        },
      },
    },
  };

  return (
    <div className={darkMode ? 'dark-chart' : 'light-chart'}>
      <div className={darkMode ? 'dark-chart-title' : 'light-chart-title'}>
        Chance of Precipitation and Wind Speed on a Given Day
      </div>
      <div className='weather-chart-container'>
        <div className='chart-axis'>
          <div className='chart-axis-label'>Chance of Precipitation</div>
        </div>

        <DualAxes {...config} />
        <div className='chart-axis'>
          <div className='chart-axis-label'>Wind Speed in Km/Hr</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherChart;
