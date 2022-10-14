import { SERVER_URL } from '../constants';

export const getLocations = async (
  authStatus,
  setAccountLocations,
  setModalVisible
) => {
  if (!(await authStatus.auth)) {
    if (setModalVisible) {
      setModalVisible(true);
    } else {
      return;
    }
  } else {
    const response = await fetch(SERVER_URL.getLocations, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authStatus),
    });
    setAccountLocations(await response.json());
  }
};
