import { useCallback, useContext } from 'react';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import { Modal } from 'antd';
import { UserSettingsContext } from '../../contexts/UserSettingsContext';

const LogoutModal = () => {
  const {
    setDarkMode,
    setRainConflict,
    setSnowConflict,
    setWindConflict,
    setUnits,
  } = useContext(UserSettingsContext);
  const { setAuthStatus, logoutModalVisible, setLogoutModalVisible } =
    useContext(AuthenticationContext);

  const handleOk = useCallback(() => {
    localStorage.removeItem('token');
    setAuthStatus({
      auth: false,
      message: 'logged out',
    });
    setDarkMode(true);
    setRainConflict(20);
    setSnowConflict(20);
    setWindConflict(30);
    setUnits('metric');
    setLogoutModalVisible(false);
  }, [
    setAuthStatus,
    setLogoutModalVisible,
    setDarkMode,
    setRainConflict,
    setSnowConflict,
    setWindConflict,
    setUnits,
  ]);

  const handleCancel = useCallback(() => {
    setLogoutModalVisible(false);
  }, [setLogoutModalVisible]);

  return (
    <Modal
      title='Wait!'
      visible={logoutModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      Are you sure you want to logout?
    </Modal>
  );
};

export default LogoutModal;
