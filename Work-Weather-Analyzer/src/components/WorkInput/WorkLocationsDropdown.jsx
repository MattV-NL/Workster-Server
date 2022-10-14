import { useEffect, useContext } from 'react';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import { WorkInputContext } from '../../contexts/WorkInputContext';
import { PositionContext } from '../../contexts/PositionContext';
import { getLocations } from '../../restAPI/getAccountLocations';
import { UserSettingsContext } from '../../contexts/UserSettingsContext';

const WorkLocationsDropdown = () => {
  const { authStatus } = useContext(AuthenticationContext);
  const { accountLocations, setAccountLocations } = useContext(PositionContext);
  const { workLocation, setWorkLocation } = useContext(WorkInputContext);
  const { darkMode } = useContext(UserSettingsContext);
  useEffect(() => {
    getLocations(authStatus, setAccountLocations);
  }, [authStatus, setAccountLocations]);

  const newWorkLocationsArray = Array.from(accountLocations).map(
    ({ latitude, longitude, location_id }) => {
      return {
        label: (
          <div
            onClick={() => {
              setWorkLocation({ latitude, longitude, location_id });
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
    <>
      <div className={darkMode ? 'dark-dropdown' : 'light-dropdown'}>
        <Dropdown overlay={menu} trigger={['click']}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              Work Locations
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
      <div>
        {workLocation.location_id > 0
          ? `Selected Location: Latitude: ${workLocation.latitude} Longitude: ${workLocation.longitude}`
          : ''}
      </div>
    </>
  );
};

export default WorkLocationsDropdown;
