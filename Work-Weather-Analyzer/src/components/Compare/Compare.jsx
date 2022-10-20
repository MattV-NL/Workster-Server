import { useContext, useEffect, useState, useMemo } from 'react';
import { WeatherDataContext } from '../../contexts/WeatherDataContext';
import { WorkDataContext } from '../../contexts/WorkDataContext';
import './compare.scss';
import { replaceDate } from '../../restAPI/replaceDate';
import { UserSettingsContext } from '../../contexts/UserSettingsContext';

const Compare = () => {
  const { rainConflict, snowConflict, windConflict, units } =
    useContext(UserSettingsContext);
  const { weatherValues } = useContext(WeatherDataContext);
  const { workValues } = useContext(WorkDataContext);
  const [isConflict, setIsConflict] = useState(null);
  const workCompareValues = useMemo(() => new Map(workValues), [workValues]);

  useEffect(() => {
    const weatherCompareValues = new Map(
      Array.from(weatherValues.values())
        .map(({ dt, rain, snow, wind_speed }) => {
          const date = replaceDate(dt * 1000);
          let windSpeed;
          if (units === 'imperial') {
            return (windSpeed = wind_speed);
          } else {
            windSpeed = wind_speed * 3.6;
          }
          if (!snow) {
            snow = 0;
          } else {
            snow = snow * 100;
          }

          return {
            date,
            rain,
            snow,
            windSpeed,
          };
        })
        .map((item) => [item.date, item])
    );

    const nextConflict = [
      ...new Set([...weatherCompareValues.keys(), ...workCompareValues.keys()]),
    ].some((date) => {
      const { rain, snow, wind } = weatherCompareValues.get(date) || {};
      const { isOutside, isWelding, isScaffolding } =
        workCompareValues.get(date) || {};

      return !!(
        (rain > rainConflict || snow > snowConflict || wind > windConflict) &&
        (isOutside || isWelding || isScaffolding)
      );
    });
    setIsConflict(nextConflict);
  }, [
    workCompareValues,
    setIsConflict,
    weatherValues,
    windConflict,
    rainConflict,
    snowConflict,
    units,
  ]);

  return (
    <div className={isConflict ? 'alert' : 'no-alert'}>
      {isConflict === false && 'No'} Conflict
    </div>
  );
};

export default Compare;
