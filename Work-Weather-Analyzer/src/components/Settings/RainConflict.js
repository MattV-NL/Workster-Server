import { useContext } from 'react';
import { UserSettingsContext } from '../../contexts/UserSettingsContext';
import { InputNumber, Slider } from 'antd';

const RainConflict = () => {
  const { rainConflict, setRainConflict } = useContext(UserSettingsContext);
  const onChange = (value) => {
    setRainConflict(value);
  };

  return (
    <>
      <div className='sub-header'>Conflicting Rainfall Amount</div>
      <div className='account-setting'>
        <Slider
          className='setting-slider'
          min={0}
          max={100}
          value={typeof rainConflict === 'number' ? rainConflict : 0}
          onChange={onChange}
        ></Slider>
        <InputNumber
          className='setting-number-input'
          min={1}
          max={300}
          value={rainConflict}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default RainConflict;
