import { createContext, useState } from 'react';
import {
  GEOLOCATION_KEY,
  LATITUDE_KEY,
  LONGITUDE_KEY,
  SAVE_LOCATION_KEY,
} from '../constants';
import { onChange } from '../restAPI/onChange';

export const PositionContext = createContext();

const PositionContextProvider = ({ children }) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [geoLocate, setGeoLocate] = useState(false);
  const [saveLocation, setSaveLocation] = useState(false);
  const [deleteLocationModalVisible, setDeleteLocationModalVisible] =
    useState(false);
  const [saveLocationModalVisible, setSaveLocationModalVisible] =
    useState(false);
  const [accountLocations, setAccountLocations] = useState([]);

  return (
    <PositionContext.Provider
      value={{
        setGeoLocate,
        setLatitude,
        setLongitude,
        saveLocation,
        setSaveLocation,
        positionData: {
          [LATITUDE_KEY]: {
            value: latitude,
            onChange: onChange({ setterFunction: setLatitude }),
          },
          [LONGITUDE_KEY]: {
            value: longitude,
            onChange: onChange({ setterFunction: setLongitude }),
          },
          [GEOLOCATION_KEY]: {
            value: geoLocate,
            onChange: onChange({
              setterFunction: setGeoLocate,
              isBoolean: true,
            }),
          },
          [SAVE_LOCATION_KEY]: {
            value: saveLocation,
            onChange: onChange({
              setterFunction: setSaveLocation,
              isBoolean: true,
            }),
          },
        },
        deleteLocationModalVisible,
        setDeleteLocationModalVisible,
        accountLocations,
        setAccountLocations,
        saveLocationModalVisible,
        setSaveLocationModalVisible,
      }}
    >
      {children}
    </PositionContext.Provider>
  );
};
export default PositionContextProvider;
