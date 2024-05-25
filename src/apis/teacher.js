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

export default getAllTeachers;
