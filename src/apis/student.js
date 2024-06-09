import instance from './instance';

const studentAccountRegist = (setEnrollmentModalOpen, payload) => {
  instance
    .post('/api/accounts', {
      name: payload.name,
      grade: payload.grade,
      phoneNumber: payload.phoneNumber,
      role: 'student',
      password: '0000',
    })
    .then((response) => {
      console.log(response);
      setEnrollmentModalOpen(false);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default studentAccountRegist;
