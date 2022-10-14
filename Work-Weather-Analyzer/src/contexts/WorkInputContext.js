import { createContext, useCallback, useContext, useState } from 'react';
import {
  DETAILS_KEY,
  OUTSIDE_KEY,
  SCAFF_KEY,
  WELD_KEY,
  WORK_DATE_KEY,
} from '../constants';
import { WorkDataContext } from './WorkDataContext';
import { onChange } from '../restAPI/onChange';
import { AuthenticationContext } from './AuthenticationContext';

export const WorkInputContext = createContext();

const WorkInputContextProvider = ({ children }) => {
  const { submitWorkValues } = useContext(WorkDataContext);
  const { authStatus } = useContext(AuthenticationContext);
  const [date, setDate] = useState('');
  const [isOutside, setIsOutside] = useState(false);
  const [isWelding, setIsWelding] = useState(false);
  const [isScaffolding, setIsScaffolding] = useState(false);
  const [workDetails, setWorkDetails] = useState('');
  const [isWorkModalVisible, setIsWorkModalVisible] = useState(false);
  const [workLocation, setWorkLocation] = useState({
    latitude: 0,
    longitude: 0,
    location_id: 0,
  });

  const workDataUpdate = useCallback(
    (e) => {
      if (authStatus.auth) {
        if (date && workDetails && workLocation.location_id > 0) {
          e.preventDefault();
          submitWorkValues(
            date,
            isOutside,
            isWelding,
            isScaffolding,
            workDetails,
            workLocation
          );
          setDate('');
          setIsOutside(false);
          setIsWelding(false);
          setIsScaffolding(false);
          setWorkDetails('');
          setWorkLocation({
            latitude: 0,
            longitude: 0,
            location_id: 0,
          });
        } else {
          setIsWorkModalVisible(true);
        }
      } else {
        if (date && workDetails) {
          e.preventDefault();
          submitWorkValues(
            date,
            isOutside,
            isWelding,
            isScaffolding,
            workDetails
          );
          setDate('');
          setIsOutside(false);
          setIsWelding(false);
          setIsScaffolding(false);
          setWorkDetails('');
        } else {
          setIsWorkModalVisible(true);
        }
      }
    },
    [
      date,
      isOutside,
      isWelding,
      isScaffolding,
      workDetails,
      setIsWorkModalVisible,
      submitWorkValues,
      workLocation,
      authStatus,
    ]
  );

  return (
    <WorkInputContext.Provider
      value={{
        workData: {
          [WORK_DATE_KEY]: {
            value: date,
            onChange: onChange({ setterFunction: setDate }),
          },
          [OUTSIDE_KEY]: {
            value: isOutside,
            onChange: onChange({
              setterFunction: setIsOutside,
              isBoolean: true,
            }),
          },
          [WELD_KEY]: {
            value: isWelding,
            onChange: onChange({
              setterFunction: setIsWelding,
              isBoolean: true,
            }),
          },
          [SCAFF_KEY]: {
            value: isScaffolding,
            onChange: onChange({
              setterFunction: setIsScaffolding,
              isBoolean: true,
            }),
          },
          [DETAILS_KEY]: {
            value: workDetails,
            onChange: onChange({ setterFunction: setWorkDetails }),
          },
        },
        workDataUpdate,
        isWorkModalVisible,
        setIsWorkModalVisible,
        setWorkLocation,
        workLocation,
      }}
    >
      {children}
    </WorkInputContext.Provider>
  );
};

export default WorkInputContextProvider;
