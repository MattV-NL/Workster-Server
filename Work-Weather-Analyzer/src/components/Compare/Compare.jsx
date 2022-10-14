import { useContext, useEffect, useState, useMemo } from 'react';
import { WeatherDataContext } from '../../contexts/WeatherDataContext';
import { WorkDataContext } from '../../contexts/WorkDataContext';
import './compare.scss';
import { replaceDate } from '../../restAPI/replaceDate';
import { UserSettingsContext } from '../../contexts/UserSettingsContext';

const Compare = () => {
  const { precipConflict, windConflict } = useContext(UserSettingsContext);
  const { weatherValues } = useContext(WeatherDataContext);
  const { workValues } = useContext(WorkDataContext);
  const [isConflict, setIsConflict] = useState(null);
  const workCompareValues = useMemo(() => new Map(workValues), [workValues]);

  useEffect(() => {
    const weatherCompareValues = new Map(
      Array.from(weatherValues.values())
        .map(({ dt, pop, wind_speed }) => {
          const date = replaceDate(dt * 1000);
          const precip = pop * 100;
          const windSpeed = wind_speed * 3.6;

          return {
            date,
            precip,
            windSpeed,
          };
        })
        .map((item) => [item.date, item])
    );

    const nextConflict = [
      ...new Set([...weatherCompareValues.keys(), ...workCompareValues.keys()]),
    ].some((date) => {
      const { precip, wind } = weatherCompareValues.get(date) || {};
      const { isOutside, isWelding, isScaffolding } =
        workCompareValues.get(date) || {};

      return !!(
        (precip > precipConflict || wind > windConflict) &&
        (isOutside || isWelding || isScaffolding)
      );
    });
    setIsConflict(nextConflict);
  }, [
    workCompareValues,
    setIsConflict,
    weatherValues,
    windConflict,
    precipConflict,
  ]);

  return (
    <div className={isConflict ? 'alert' : 'no-alert'}>
      {isConflict === false && 'No'} Conflict
    </div>
  );
};

export default Compare;
