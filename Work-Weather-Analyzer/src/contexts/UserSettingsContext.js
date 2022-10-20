import { createContext, useState } from 'react';

export const UserSettingsContext = createContext();

const UserSettingsContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [rainConflict, setRainConflict] = useState(20);
  const [snowConflict, setSnowConflict] = useState(20);
  const [windConflict, setWindConflict] = useState(30);
  const [units, setUnits] = useState('metric');
  // metric - m/s & degrees C
  // standard m/s & degrees K
  // imperial mi/hr & degrees F
  return (
    <UserSettingsContext.Provider
      value={{
        darkMode,
        setDarkMode,
        units,
        setUnits,
        emailNotifications,
        setEmailNotifications,
        windConflict,
        setWindConflict,
        rainConflict,
        setRainConflict,
        snowConflict,
        setSnowConflict,
      }}
    >
      {children}
    </UserSettingsContext.Provider>
  );
};

export default UserSettingsContextProvider;
