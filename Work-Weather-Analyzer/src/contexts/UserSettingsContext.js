import { createContext, useState } from 'react';

export const UserSettingsContext = createContext();

const UserSettingsContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [precipConflict, setPrecipConflict] = useState(20);
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
        precipConflict,
        setPrecipConflict,
      }}
    >
      {children}
    </UserSettingsContext.Provider>
  );
};

export default UserSettingsContextProvider;
