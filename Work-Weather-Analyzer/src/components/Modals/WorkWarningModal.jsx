import { useCallback, useContext } from 'react';
import { Modal } from 'antd';
import { WorkInputContext } from '../../contexts/WorkInputContext';

const WorkWarningModal = () => {
  const { isWorkModalVisible, setIsWorkModalVisible } =
    useContext(WorkInputContext);
  const handleOkCancel = useCallback(() => {
    setIsWorkModalVisible(false);
  }, [setIsWorkModalVisible]);

  return (
    <Modal
      title='Wait!'
      visible={isWorkModalVisible}
      onOk={handleOkCancel}
      onCancel={handleOkCancel}
    >
      Please enter at least a date and some details about the work to be done.
      If you're logged in, please select a location as well.
    </Modal>
  );
};

export default WorkWarningModal;
