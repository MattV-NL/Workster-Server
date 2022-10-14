import { useContext, useCallback } from 'react';
import { Modal } from 'antd';
import { PositionContext } from '../../contexts/PositionContext';

const SaveLocationModal = () => {
  const { saveLocationModalVisible, setSaveLocationModalVisible } =
    useContext(PositionContext);
  const handleOkCancel = useCallback(() => {
    setSaveLocationModalVisible(false);
  }, [setSaveLocationModalVisible]);
  return (
    <Modal
      title='Sorry...'
      visible={saveLocationModalVisible}
      onOk={handleOkCancel}
      onCancel={handleOkCancel}
    >
      You must be logged in to save a location.
    </Modal>
  );
};

export default SaveLocationModal;
