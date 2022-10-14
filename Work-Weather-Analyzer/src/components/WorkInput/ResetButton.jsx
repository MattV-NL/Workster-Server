import { useContext, useCallback } from 'react';
import { WeatherDataContext } from '../../contexts/WeatherDataContext';
import ButtonComp from '../Inputs/Button';

const ResetButton = () => {
  const { setIsModalVisible } = useContext(WeatherDataContext);

  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, [setIsModalVisible]);

  return (
    <div className='button-container'>
      <ButtonComp type='primary' onClick={showModal}>
        Reset Info
      </ButtonComp>
    </div>
  );
};

export default ResetButton;
