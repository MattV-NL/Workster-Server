import { useCallback, useContext } from 'react';
import { WeatherDataContext } from '../../contexts/WeatherDataContext';
import { Modal } from 'antd';

const WeatherWarningModal = () => {
  const { isWeatherModalVisible, setIsWeatherModalVisible } =
    useContext(WeatherDataContext);

  const handleOkCancel = useCallback(() => {
    setIsWeatherModalVisible(false);
  }, [setIsWeatherModalVisible]);

  return (
    <Modal
      title='Wait!'
      visible={isWeatherModalVisible}
      onOk={handleOkCancel}
      onCancel={handleOkCancel}
    >
      Please either select either your current location or enter your
      coordinates.
    </Modal>
  );
};

export default WeatherWarningModal;
