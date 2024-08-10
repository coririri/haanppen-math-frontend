import instance from './instance';

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

export const putAccountInfo = (userForm, setErrorMessages) => {
  instance
    .patch('/api/accounts/my', {
      phoneNumber: userForm.phoneNumber,
      name: userForm.name,
      prevPassword: userForm.password,
      newPassword: userForm.newPassword,
    })
    .then(() => {})
    .catch(() => {
      setErrorMessages((prev) => ({
        ...prev,
        password: '기존 비밀번호가 틀렸습니다',
      }));
    });
};

export default getMyAccountInfo;
