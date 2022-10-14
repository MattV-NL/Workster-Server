import { useContext, useCallback } from 'react';
import { PositionContext } from '../../contexts/PositionContext';
import { SERVER_URL } from '../../constants';
import { Modal } from 'antd';
import { deleteRow } from '../../restAPI/deleteRow';

const DeleteLocationModal = ({ children }) => {
  const { deleteLocationModalVisible, setDeleteLocationModalVisible } =
    useContext(PositionContext);

  const handleCancel = useCallback(() => {
    setDeleteLocationModalVisible(false);
  }, [setDeleteLocationModalVisible]);

  const handleOk = useCallback(async () => {
    const packagedInfo = {
      location_id: children,
    };
    const response = await deleteRow(SERVER_URL.deleteLocation, packagedInfo);
    console.log(response);
    setDeleteLocationModalVisible(false);
  }, [setDeleteLocationModalVisible, children]);

  return (
    <Modal
      title='Wait!'
      visible={deleteLocationModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      Are you sure you want to delete this row. This can not be undone.
    </Modal>
  );
};

export default DeleteLocationModal;
