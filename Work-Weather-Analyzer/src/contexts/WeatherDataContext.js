import { createContext, useCallback, useState, useContext } from 'react';
import { GEOLOCATION_KEY, LATITUDE_KEY, LONGITUDE_KEY } from '../constants';
import { PositionContext } from './PositionContext';
import { replaceDate } from '../restAPI/replaceDate';
import {
  error,
  options,
  getCoordinates,
  sendCoordinatesGeolocate,
  sendCoordinatesManual,
  manualLocationInput,
} from '../restAPI/handleLocation';
import { AuthenticationContext } from './AuthenticationContext';
import { UserSettingsContext } from './UserSettingsContext';

export const WeatherDataContext = createContext();

const WeatherDataContextProvider = ({ children }) => {
  const {
    positionData,
    setGeoLocate,
    setLatitude,
    setLongitude,
    setSaveLocation,
  } = useContext(PositionContext);
  const { units } = useContext(UserSettingsContext);
  const { authStatus } = useContext(AuthenticationContext);
  const [weatherValues, setWeatherValues] = useState(new Map());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isWeatherModalVisible, setIsWeatherModalVisible] = useState(false);
  const [isWeatherDetailsVisible, setIsWeatherDetailsVisible] = useState(false);

  const storeWeatherData = useCallback(
    ({ daily }) => {
      setWeatherValues(
        new Map(daily.map((day) => [replaceDate(day.dt * 1000), day]))
      );
    },
    [setWeatherValues]
  );

  const success = useCallback(
    async (pos) => {
      storeWeatherData(await getCoordinates(pos, units));
      setGeoLocate(false);
      setSaveLocation(false);
    },
    [setGeoLocate, setSaveLocation, storeWeatherData, units]
  );

  const sendLocation = useCallback(async () => {
    if (positionData[GEOLOCATION_KEY].value) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          sendCoordinatesGeolocate(pos, authStatus.user_id);
        },
        error,
        options
      );
    } else {
      sendCoordinatesManual(
        positionData[LATITUDE_KEY].value,
        positionData[LONGITUDE_KEY].value,
        authStatus.user_id
      );
    }
  }, [positionData, authStatus.user_id]);

  const getLocation = useCallback(async () => {
    if (
      positionData[GEOLOCATION_KEY].value ||
      (positionData[LATITUDE_KEY].value && positionData[LONGITUDE_KEY].value)
    ) {
      if (positionData[GEOLOCATION_KEY].value) {
        navigator.geolocation.getCurrentPosition(success, error, options);
      } else {
        storeWeatherData(
          await manualLocationInput(
            positionData[LATITUDE_KEY].value,
            positionData[LONGITUDE_KEY].value,
            units
          )
        );
        setLatitude('');
        setLongitude('');
        setSaveLocation(false);
      }
    } else {
      setIsWeatherModalVisible(true);
    }
  }, [
    positionData,
    success,
    setLatitude,
    setLongitude,
    setIsWeatherModalVisible,
    setSaveLocation,
    storeWeatherData,
    units,
  ]);

  const clearWeatherValues = useCallback(() => {
    setWeatherValues(new Map());
    setGeoLocate(false);
    setLatitude('');
    setLongitude('');
  }, [setGeoLocate, setLatitude, setLongitude]);

  return (
    <WeatherDataContext.Provider
      value={{
        sendLocation,
        getLocation,
        weatherValues,
        isModalVisible,
        setIsModalVisible,
        isWeatherModalVisible,
        setIsWeatherModalVisible,
        isWeatherDetailsVisible,
        setIsWeatherDetailsVisible,
        clearWeatherValues,
      }}
    >
      {children}
    </WeatherDataContext.Provider>
  );
};

export default WeatherDataContextProvider;
