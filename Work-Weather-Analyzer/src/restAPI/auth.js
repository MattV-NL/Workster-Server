import { SERVER_URL } from '../constants';

export const checkToken = async (token) => {
  const response = await fetch(SERVER_URL.authCheck, {
    headers: {
      'x-access-token': token,
    },
  });
  return response.json();
};

export const attemptLogin = async (
  username,
  password,
  setUserNotFound,
  setLoginMessageModal
) => {
  if (username && password) {
    const loginData = {
      username,
      password,
    };
    const response = await fetch(SERVER_URL.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });
    const returnedData = await response.json();
    localStorage.setItem('token', returnedData.token);
    console.log(returnedData);
    setUserNotFound(returnedData.userNotFound);
    setLoginMessageModal(returnedData.loginMessageModal);
    return true;
  } else {
    return false;
  }
};

export const attemptReg = async (
  usernameReg,
  passwordReg,
  emailReg,
  setRegMessage
) => {
  if (usernameReg && passwordReg && emailReg) {
    const regData = {
      username: usernameReg,
      password: passwordReg,
      email: emailReg,
    };
    const response = await fetch(SERVER_URL.register, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(regData),
    });
    const message = await response.json();
    setRegMessage(message.status);
    return true;
  } else {
    return false;
  }
};
