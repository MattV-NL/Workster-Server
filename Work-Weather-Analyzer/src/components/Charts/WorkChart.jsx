import { useContext, useMemo } from 'react';
import { WorkDataContext } from '../../contexts/WorkDataContext';
import { Column } from '@ant-design/plots';
import './charts.scss';
import { UserSettingsContext } from '../../contexts/UserSettingsContext';

const WorkChart = () => {
  const { workValues } = useContext(WorkDataContext);
  const { darkMode } = useContext(UserSettingsContext);

  const data = useMemo(() => {
    const arrWork = [...workValues.values()];

    return [
      {
        id: 'Outside',
        count: arrWork.filter(({ isOutside }) => isOutside).length,
      },
      {
        id: 'Welding',
        count: arrWork.filter(({ isWelding }) => isWelding).length,
      },
      {
        id: 'Scaffolding',
        count: arrWork.filter(({ isScaffolding }) => isScaffolding).length,
      },
    ];
  }, [workValues]);

  const config = {
    data,
    xField: 'id',
    yField: 'count',
    label: {
      position: 'middle',
      style: {
        fill: `${darkMode ? '#fff' : '#000'}`,
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        position: 'bottom',
        style: {
          fill: `${darkMode ? '#fff' : '#000'}`,
        },
      },
    },
    yAxis: {
      label: {
        style: {
          fill: `${darkMode ? '#fff' : '#000'}`,
          fontSize: 12,
        },
      },
    },
    meta: {
      id: {
        alias: 'Type of Work',
      },
      count: {
        alias: 'count',
      },
    },
  };

  return (
    <div className={darkMode ? 'dark-chart' : 'light-chart'}>
      <div className={darkMode ? 'dark-chart-title' : 'light-chart-title'}>
        Number of Instances of Each Task in Work Scope
      </div>
      <Column {...config} />
    </div>
  );
};

export default WorkChart;
