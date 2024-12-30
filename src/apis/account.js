import axios from 'axios';
import instance from './instance';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const getMyAccountInfo = () => instance.get('/api/accounts/my');

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
