import { useCallback, useContext } from 'react';
import { WorkDataContext } from '../../contexts/WorkDataContext';
import { WeatherDataContext } from '../../contexts/WeatherDataContext';
import { Modal } from 'antd';

const ResetWarningModal = () => {
  const { clearWorkValues } = useContext(WorkDataContext);
  const { clearWeatherValues, isModalVisible, setIsModalVisible } =
    useContext(WeatherDataContext);

  const handleOk = useCallback(() => {
    clearWorkValues();
    clearWeatherValues();
    setIsModalVisible(false);
  }, [clearWeatherValues, clearWorkValues, setIsModalVisible]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      title='Are you sure?'
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      Are you sure you want to reset all the data you have already entered?
    </Modal>
  );
};

export default ResetWarningModal;
