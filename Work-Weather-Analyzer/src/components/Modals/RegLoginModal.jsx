import { useCallback, useContext } from 'react';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import { Modal } from 'antd';

const RegLoginModal = () => {
  const { isRegModalVisible, setIsRegModalVisible } = useContext(
    AuthenticationContext
  );

  const handleOkCancel = useCallback(() => {
    setIsRegModalVisible(false);
  }, [setIsRegModalVisible]);

  return (
    <Modal
      title='Wait!'
      visible={isRegModalVisible}
      onOk={handleOkCancel}
      onCancel={handleOkCancel}
    >
      Please fill all fields to register or login.
    </Modal>
  );
};

export default RegLoginModal;
