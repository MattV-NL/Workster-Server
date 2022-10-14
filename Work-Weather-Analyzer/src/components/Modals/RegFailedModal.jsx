import { useCallback, useContext } from 'react';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import { Modal } from 'antd';

const RegFailedModal = () => {
  const { regMessage, setRegMessage } = useContext(AuthenticationContext);
  const handleOkCancel = useCallback(() => {
    setRegMessage(false);
  }, [setRegMessage]);

  return (
    <Modal
      title='Wait!'
      visible={regMessage}
      onOk={handleOkCancel}
      onCancel={handleOkCancel}
    >
      username or email already saved to database. Please try again.
    </Modal>
  );
};

export default RegFailedModal;
