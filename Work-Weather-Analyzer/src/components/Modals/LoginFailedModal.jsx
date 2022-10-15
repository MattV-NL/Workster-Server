import { useCallback, useContext } from 'react';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import { Modal } from 'antd';

const LoginFailedModal = () => {
  const { loginMessageModal, setLoginMessageModal, userNotFound } = useContext(
    AuthenticationContext
  );
  const handleOkCancel = useCallback(() => {
    setLoginMessageModal(false);
  }, [setLoginMessageModal]);

  return (
    <Modal
      title='Error'
      visible={loginMessageModal}
      onOk={handleOkCancel}
      onCancel={handleOkCancel}
    >
      {userNotFound
        ? 'User not found'
        : 'Username and password combination does not match our records, please try again.'}
    </Modal>
  );
};

export default LoginFailedModal;
