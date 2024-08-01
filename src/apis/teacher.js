import instance from './instance';

const getAllTeachers = async (setTeacherList) => {
  await instance
    .get('/api/members/teachers/all')
    .then((response) => {
      const entireTeahcerList = response.data;
      setTeacherList((prev) => [...prev, ...entireTeahcerList]);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const registTeacherAccount = (
  setEnrollmentModalOpen,
  payload,
  queryClient,
  searchNameValue,
) => {
  instance
    .post('/api/accounts', {
      name: payload.name,
      phoneNumber: payload.phoneNumber,
      role: 'teacher',
      password: '0000',
    })
    .then((response) => {
      console.log(response);
      queryClient.invalidateQueries(['teacherList', searchNameValue]);
      setEnrollmentModalOpen(false);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteTeacherAccount = (forDeletedTeacherIds) =>
  instance
    .delete('api/accounts', {
      data: {
        targetIds: forDeletedTeacherIds,
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

export const modifyTeacher = (
  setEnrollmentModalOpen,
  payload,
  queryKeyQueryClient,
  queryKeySearchNameValue,
) =>
  instance
    .put('api/accounts/teacher', {
      targetId: payload.id,
      name: payload.name,
      phoneNumber: payload.phoneNumber,
    })
    .then((response) => {
      queryKeyQueryClient.invalidateQueries([
        'studentList',
        queryKeySearchNameValue,
      ]);
      setEnrollmentModalOpen(false);
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

export const getTeacherList = ({ pageParam, queryKey }) =>
  instance.get('/api/members/teachers', {
    params: {
      size: 10,
      cursorIndex: pageParam,
      name: queryKey[1],
    },
  });

export default getAllTeachers;
