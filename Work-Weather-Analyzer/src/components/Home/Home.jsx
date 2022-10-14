import './home.scss';
import LogInForm from './LogInForm';
import { useEffect, useContext } from 'react';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import { UserSettingsContext } from '../../contexts/UserSettingsContext';
import { checkToken } from '../../restAPI/auth';
import { getSettings } from '../../restAPI/getSettings';

const Home = () => {
  const { authStatus, setAuthStatus } = useContext(AuthenticationContext);
  const {
    setDarkMode,
    setUnits,
    setEmailNotifications,
    setPrecipConflict,
    setWindConflict,
  } = useContext(UserSettingsContext);

  useEffect(() => {
    const checkAuth = async () => {
      setAuthStatus(await checkToken(localStorage.getItem('token')));
    };
    checkAuth();
  }, [setAuthStatus]);

  useEffect(() => {
    const checkSettings = async () => {
      getSettings(
        authStatus,
        setDarkMode,
        setUnits,
        setEmailNotifications,
        setPrecipConflict,
        setWindConflict
      );
    };
    checkSettings();
  }, [
    authStatus,
    setDarkMode,
    setUnits,
    setEmailNotifications,
    setPrecipConflict,
    setWindConflict,
  ]);

  return (
    <div className='home-container'>
      <div className='welcome-message'>
        Please Start by Registering or Signing In
      </div>
      <LogInForm />
    </div>
  );
};

export default Home;
