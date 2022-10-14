import { useContext } from 'react';
import { UserSettingsContext } from '../../contexts/UserSettingsContext';
import { InputNumber, Slider } from 'antd';

const WindConflict = () => {
  const { windConflict, setWindConflict } = useContext(UserSettingsContext);

  const onChange = (value) => {
    setWindConflict(value);
  };

  return (
    <>
      <div className='sub-header'>Wind Conflict Parameter</div>
      <div className='account-setting'>
        <Slider
          className='setting-slider'
          min={0}
          max={100}
          onChange={onChange}
          value={typeof windConflict === 'number' ? windConflict : 0}
        ></Slider>
        <InputNumber
          className='setting-number-input'
          min={1}
          max={300}
          value={windConflict}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default WindConflict;
