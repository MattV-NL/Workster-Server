import { useContext } from 'react';
import { UserSettingsContext } from '../../contexts/UserSettingsContext';
import { InputNumber, Slider } from 'antd';
import { onChange } from '../../restAPI/onChange';

const PrecipConflict = () => {
  const { precipConflict, setPrecipConflict } = useContext(UserSettingsContext);
  const onChange = (value) => {
    setPrecipConflict(value);
  };

  return (
    <>
      <div className='sub-header'>Precipitation Conflict Parameter</div>
      <div className='account-setting'>
        <Slider
          className='setting-slider'
          min={0}
          max={100}
          value={typeof precipConflict === 'number' ? precipConflict : 0}
          onChange={onChange}
        ></Slider>
        <InputNumber
          className='setting-number-input'
          min={1}
          max={300}
          value={precipConflict}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default PrecipConflict;
