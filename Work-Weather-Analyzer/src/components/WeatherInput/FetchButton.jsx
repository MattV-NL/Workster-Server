import { useContext, useCallback } from 'react';
import { WeatherDataContext } from '../../contexts/WeatherDataContext';
import { PositionContext } from '../../contexts/PositionContext';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import ButtonComp from '../Inputs/Button';

const FetchButton = () => {
  const { getLocation, sendLocation } = useContext(WeatherDataContext);
  const { saveLocation, setSaveLocationModalVisible } =
    useContext(PositionContext);
  const { authStatus } = useContext(AuthenticationContext);

  const handleClick = useCallback(async () => {
    if (saveLocation) {
      if (await authStatus.auth) {
        sendLocation();
        getLocation();
      } else {
        setSaveLocationModalVisible(true);
      }
    } else {
      getLocation();
    }
  }, [
    getLocation,
    saveLocation,
    sendLocation,
    authStatus,
    setSaveLocationModalVisible,
  ]);

  return (
    <div className='button-container'>
      <ButtonComp type='primary' onClick={handleClick}>
        Get Weather Info
      </ButtonComp>
    </div>
  );
};

export default FetchButton;
