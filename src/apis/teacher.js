import instance from './instance';

const getAllTeachers = (setTeacherList) => {
  instance
    .get('/api/members/teachers')
    .then((response) => {
      const entireTeahcerList = response.data;
      setTeacherList((prev) => [...prev, ...entireTeahcerList]);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const teacherAccountRegist = (setEnrollmentModalOpen, payload) => {
  instance
    .post('/api/accounts', {
      name: payload.name,
      phoneNumber: payload.phoneNumber,
      role: 'teacher',
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

export default getAllTeachers;
