import InputComp from '../Inputs/Input';
import { loginFormInputs, regFormInputs } from '../../constants';
import '../Inputs/inputs.scss';
import { useContext } from 'react';
import ButtonComp from '../Inputs/Button';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import { FormOutlined, LoginOutlined } from '@ant-design/icons';
import { UserSettingsContext } from '../../contexts/UserSettingsContext';

const LogInForm = () => {
  const { handleClickReg, handleClickLogin, logInData, regData } = useContext(
    AuthenticationContext
  );
  const { darkMode } = useContext(UserSettingsContext);

  return (
    <div className={darkMode ? 'dark-form-layout' : 'light-form-layout'}>
      <div className='form'>
        <div className='form-header'>Register Here</div>
        {[...regFormInputs.values()].map(({ label, id, type, required }) => {
          return (
            <div className='label-input-container' key={id}>
              <label
                className={darkMode ? 'dark-form-label' : 'light-form-label'}
              >
                {label}
              </label>
              <InputComp
                id={id + label}
                type={type}
                value={regData[id].value}
                required={required}
                onChange={regData[id].onChange}
                placeholder={label}
              />
            </div>
          );
        })}
        <ButtonComp type='primary' onClick={handleClickReg}>
          <FormOutlined />
          {'   '}Register
        </ButtonComp>
        <div className='form-header'>Log In Here</div>
        {[...loginFormInputs.values()].map(({ label, id, type, required }) => {
          return (
            <div className='label-input-container' key={id}>
              <label
                className={darkMode ? 'dark-form-label' : 'light-form-label'}
              >
                {label}
              </label>
              <InputComp
                id={id + type}
                type={type}
                value={logInData[id].value}
                required={required}
                onChange={logInData[id].onChange}
                placeholder={label}
              />
            </div>
          );
        })}
        <ButtonComp type='primary' onClick={handleClickLogin}>
          <LoginOutlined />
          {'   '}Log In
        </ButtonComp>
      </div>
    </div>
  );
};

export default LogInForm;
