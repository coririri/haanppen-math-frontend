import instance from './instance';

const getMyAccountInfo = (setUserForm) => {
  instance
    .get('/api/accounts/my', {})
    .then((response) => {
      console.log(response);
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

export const putAccountInfo = (userForm) => {
  instance
    .patch('/api/accounts/my', {
      phoneNumber: userForm.phoneNumber,
      name: userForm.name,
      prevPassword: userForm.password,
      newPassword: userForm.newPassword,
    })
    .then(() => {})
    .catch(() => {});
};

export default getMyAccountInfo;
