import instance from './instance';

const getMyAccountInfo = () => {
  instance
    .get('/api/accounts/my', {
      headers: {},
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const putAccountInfo = (userForm) => {
  instance
    .put('/api/accounts/my', {
      phoneNumber: userForm.phoneNumber,
      name: userForm.name,
      prevPassword: userForm.password,
      newPassword: userForm.newPassword,
    })
    .then(() => {})
    .catch(() => {});
};

export default getMyAccountInfo;
