import axios from 'axios';
import instance from './instance';
import { UserFormType } from '../types/userType';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const getMyAccountInfo = () => instance.get('/api/accounts/my');

export const putAccountInfo = (userForm: UserFormType) =>
  instance.patch('/api/accounts/my', {
    phoneNumber: userForm.phoneNumber,
    name: userForm.name,
    prevPassword: userForm.password,
    newPassword: userForm.newPassword,
  });

export const getPasswordValidCode = (phoneNumber: string) =>
  axios.post(
    `${backendUrl}api/accounts/password/verification?phoneNumber=${phoneNumber}`,
  );

export const validePasswordCode = (
  phoneNumber: string,
  verificationCode: string,
) =>
  axios.put(
    `${backendUrl}api/accounts/password/verification?phoneNumber=${phoneNumber}&verificationCode=${verificationCode}`,
  );

export default getMyAccountInfo;
