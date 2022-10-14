import InputComp from '../Inputs/Input';
import { positionFormInputs } from '../../constants';
import '../Inputs/inputs.scss';
import { useContext } from 'react';
import { PositionContext } from '../../contexts/PositionContext';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import LocationDropdown from './LocationDropdown';
import { UserSettingsContext } from '../../contexts/UserSettingsContext';
import { Switch } from 'antd';

const PositionInput = () => {
  const { darkMode } = useContext(UserSettingsContext);
  const { positionData } = useContext(PositionContext);
  const { authStatus } = useContext(AuthenticationContext);
  return (
    <div className={darkMode ? 'dark-form-layout' : 'light-form-layout'}>
      <form className='form'>
        {authStatus.auth ? <LocationDropdown /> : ''}
        {[...positionFormInputs.values()].map(
          ({ label, id, type, required }) => {
            if (type === 'checkbox') {
              return (
                <div className='label-input-container' key={id}>
                  <label
                    className={
                      darkMode ? 'dark-form-label' : 'light-form-label'
                    }
                  >
                    {label}
                  </label>
                  <Switch
                    className={darkMode ? 'dark-switch' : 'light-switch'}
                    id={id}
                    required={required}
                    onClick={positionData[id].onChange}
                    checked={positionData[id].value}
                    defaultChecked={false}
                  />
                </div>
              );
            } else {
              return (
                <div className='label-input-container' key={id}>
                  <label
                    className={
                      darkMode ? 'dark-form-label' : 'light-form-label'
                    }
                  >
                    {label}
                  </label>
                  <InputComp
                    id={id}
                    type={type}
                    value={positionData[id].value}
                    required={required}
                    onChange={positionData[id].onChange}
                  />
                </div>
              );
            }
          }
        )}
      </form>
    </div>
  );
};

export default PositionInput;
