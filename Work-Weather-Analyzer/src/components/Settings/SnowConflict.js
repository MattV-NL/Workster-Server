import { useContext } from 'react';
import { UserSettingsContext } from '../../contexts/UserSettingsContext';
import { InputNumber, Slider } from 'antd';

const SnowConflict = () => {
  const { snowConflict, setSnowConflict } = useContext(UserSettingsContext);
  const onChange = (value) => {
    setSnowConflict(value);
  };

  return (
    <>
      <div className='sub-header'>Conflicting Snowfall Amount</div>
      <div className='account-setting'>
        <Slider
          className='setting-slider'
          min={0}
          max={100}
          value={typeof snowConflict === 'number' ? snowConflict : 0}
          onChange={onChange}
        ></Slider>
        <InputNumber
          className='setting-number-input'
          min={1}
          max={300}
          value={snowConflict}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default SnowConflict;
