import { useContext, useEffect } from 'react';
import { paths, locationsTableColumns } from '../../constants';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import './account.scss';
import { Table } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { PositionContext } from '../../contexts/PositionContext';
import DeleteLocationModal from '../Modals/DeleteLocationModal';
import { getLocations } from '../../restAPI/getAccountLocations';
import AccountSettingsLink from './AccountSettingsLink';
import Logout from './Logout';
import ButtonComp from '../Inputs/Button';
import { UserSettingsContext } from '../../contexts/UserSettingsContext';

const Account = () => {
  const { darkMode } = useContext(UserSettingsContext);
  const { authStatus, setIsAccountModalVisible } = useContext(
    AuthenticationContext
  );
  const {
    deleteLocationModalVisible,
    setDeleteLocationModalVisible,
    accountLocations,
    setAccountLocations,
  } = useContext(PositionContext);

  useEffect(() => {
    getLocations(authStatus, setAccountLocations, setIsAccountModalVisible);
  }, [
    authStatus,
    setAccountLocations,
    setIsAccountModalVisible,
    deleteLocationModalVisible,
  ]);

  const datasource = accountLocations.map((location) => {
    const latitudeLink = (location.latitudeLink = (
      <Link to={`${paths.SAVED_WORK}${location.location_id}`}>
        {location.latitude}
      </Link>
    ));
    const longitudeLink = (location.longtiudeLink = (
      <Link to={`${paths.SAVED_WORK}${location.location_id}`}>
        {location.longitude}
      </Link>
    ));
    const deleteRowIcon = (location.deleteIcon = (
      <>
        <DeleteOutlined
          onClick={() => {
            setDeleteLocationModalVisible(true);
          }}
        />
        <DeleteLocationModal children={location.location_id} />
      </>
    ));
    return {
      latitudeLink,
      longitudeLink,
      deleteRowIcon,
    };
  });

  datasource.map((item, index) => (item.key = index));

  return (
    <div className={darkMode ? 'dark-page-layout' : 'light-page-layout'}>
      <div className='page'>
        {authStatus.auth ? (
          <>
            <div
              className={darkMode ? 'dark-page-header' : 'light-page-header'}
            >
              {authStatus.username}
            </div>
            <div className='page-navbar'>
              <AccountSettingsLink />
              <Logout />
            </div>
            <div className={darkMode ? 'dark-page-label' : 'light-page-label'}>
              Saved Locations
            </div>
            <div
              className={
                darkMode ? 'dark-locations-table' : 'light-locations-table'
              }
            >
              <Table dataSource={datasource} columns={locationsTableColumns} />
            </div>
          </>
        ) : (
          <>
            <div>Click here to register or sign in.</div>

            <Link to={paths.HOME}>
              <ButtonComp type={'primary'}>to Homepage</ButtonComp>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Account;
