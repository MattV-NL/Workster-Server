import { useContext } from 'react';
import { WeatherDataContext } from '../../contexts/WeatherDataContext';
import { Modal } from 'antd';

const WeatherDetailsModal = ({ children, title }) => {
  const { isWeatherDetailsVisible, setIsWeatherDetailsVisible } =
    useContext(WeatherDataContext);
  const handleOkCancel = () => {
    setIsWeatherDetailsVisible(false);
  };
  return (
    <Modal
      title={title}
      visible={isWeatherDetailsVisible}
      onOk={handleOkCancel}
      onCancel={handleOkCancel}
    >
      {children}
    </Modal>
  );
};

export default WeatherDetailsModal;
