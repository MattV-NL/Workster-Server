import { SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { paths } from '../../constants';
import { UserSettingsContext } from '../../contexts/UserSettingsContext';
import { useContext } from 'react';

const AccountSettingsLink = () => {
  const { darkMode } = useContext(UserSettingsContext);
  return (
    <Link
      to={paths.SETTINGS}
      className={darkMode ? 'dark-navbar-item' : 'light-navbar-item'}
    >
      <SettingOutlined />
      {'  '}
      Settings
    </Link>
  );
};

export default AccountSettingsLink;
