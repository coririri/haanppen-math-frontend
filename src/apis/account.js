import axios from 'axios';
import instance from './instance';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const getMyAccountInfo = (setUserForm) => {
  instance
    .get('/api/accounts/my')
    .then((response) => {
      const userData = response.data;
      setUserForm({
        name: userData.userName,
        phoneNumber: userData.phoneNumber,
        password: '',
        newPassword: '',
        registerDate: '24.08.02',
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const putAccountInfo = (userForm) =>
  instance.patch('/api/accounts/my', {
    phoneNumber: userForm.phoneNumber,
    name: userForm.name,
    prevPassword: userForm.password,
    newPassword: userForm.newPassword,
  });

export const getPasswordValidCode = (phoneNumber) =>
  axios.post(
    `${backendUrl}api/accounts/password/verification?phoneNumber=${phoneNumber}`,
  );

export const validePasswordCode = (phoneNumber, verificationCode) =>
  axios.put(
    `${backendUrl}api/accounts/password/verification?phoneNumber=${phoneNumber}&verificationCode=${verificationCode}`,
  );

export default getMyAccountInfo;
