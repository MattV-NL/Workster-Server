import { useContext } from 'react';
import { WorkDataContext } from '../../contexts/WorkDataContext';
import { Modal } from 'antd';

const WorkDetailsModal = ({ children, title }) => {
  const { isWorkDetailsVisible, setIsWorkDetailsVisible } =
    useContext(WorkDataContext);
  const handleOkCancel = () => {
    setIsWorkDetailsVisible(false);
  };
  return (
    <Modal
      title={title}
      visible={isWorkDetailsVisible}
      onOk={handleOkCancel}
      onCancel={handleOkCancel}
    >
      {children}
    </Modal>
  );
};

export default WorkDetailsModal;
