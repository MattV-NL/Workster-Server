import '../Inputs/inputs.scss';
import WorkButton from './WorkButton';
import InputComp from '../Inputs/Input';
import { workFormInputs } from '../../constants';
import { WorkInputContext } from '../../contexts/WorkInputContext';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import { useContext } from 'react';
import WorkLocationsDropdown from './WorkLocationsDropdown';
import { UserSettingsContext } from '../../contexts/UserSettingsContext';
import { Switch } from 'antd';

const WorkForm = () => {
  const { workData } = useContext(WorkInputContext);
  const { authStatus } = useContext(AuthenticationContext);
  const { darkMode } = useContext(UserSettingsContext);

  return (
    <div className={darkMode ? 'dark-form-layout' : 'light-form-layout'}>
      <div className='form'>
        <form className='form'>
          {[...workFormInputs.values()].map(({ label, id, type, required }) => {
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
                    defaultChecked={false}
                    id={id}
                    onClick={workData[id].onChange}
                    checked={workData[id].value}
                    required={required}
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
                    value={workData[id].value}
                    required={required}
                    onChange={workData[id].onChange}
                  />
                </div>
              );
            }
          })}
          {authStatus.auth ? <WorkLocationsDropdown /> : ''}
        </form>
        <WorkButton />
      </div>
    </div>
  );
};

export default WorkForm;
