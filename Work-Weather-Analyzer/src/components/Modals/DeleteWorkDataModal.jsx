import { useCallback, useContext } from 'react';
import { WorkDataContext } from '../../contexts/WorkDataContext';
import { Modal } from 'antd';
import { deleteRow } from '../../restAPI/deleteRow';
import { SERVER_URL } from '../../constants';

const DeleteWorkDataModal = ({ children }) => {
  const { deleteWorkModalVisible, setDeleteWorkModalVisible } =
    useContext(WorkDataContext);

  const handleCancel = useCallback(() => {
    setDeleteWorkModalVisible(false);
  }, [setDeleteWorkModalVisible]);

  const handleOk = useCallback(async () => {
    const packagedInfo = {
      information_id: children,
    };
    const response = await deleteRow(
      SERVER_URL.deleteWorkInformation,
      packagedInfo
    );
    console.log(response);
    setDeleteWorkModalVisible(false);
  }, [setDeleteWorkModalVisible, children]);

  return (
    <Modal
      title='Wait!'
      visible={deleteWorkModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      Are you sure you want to delete this row. This can not be undone.
    </Modal>
  );
};

export default DeleteWorkDataModal;
