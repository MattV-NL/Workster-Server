import { useEffect, useContext } from 'react';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import { PositionContext } from '../../contexts/PositionContext';
import { getLocations } from '../../restAPI/getAccountLocations';
import { UserSettingsContext } from '../../contexts/UserSettingsContext';

const LocationDropdown = () => {
  const { darkMode } = useContext(UserSettingsContext);
  const { authStatus } = useContext(AuthenticationContext);
  const { setLatitude, setLongitude, accountLocations, setAccountLocations } =
    useContext(PositionContext);

  useEffect(() => {
    getLocations(authStatus, setAccountLocations);
  }, [authStatus, setAccountLocations]);

  const newWorkLocationsArray = Array.from(accountLocations).map(
    ({ latitude, longitude }) => {
      return {
        label: (
          <div
            onClick={() => {
              setLatitude(latitude);
              setLongitude(longitude);
            }}
          >
            Latitude: {latitude} Longitude: {longitude}
          </div>
        ),
      };
    }
  );

  const menu = <Menu items={newWorkLocationsArray} />;

  return (
    <div className={darkMode ? 'dark-dropdown' : 'light-dropdown'}>
      <Dropdown overlay={menu} trigger={['click']}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            Saved Locations
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default LocationDropdown;
