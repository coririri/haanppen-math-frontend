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
  page,
) => {
  instance
    .post('/api/accounts', {
      name: payload.name,
      phoneNumber: payload.phoneNumber,
      role: 'teacher',
      password: '0000',
    })
    .then(() => {
      queryClient.invalidateQueries(['teachers', searchNameValue, page - 1]);
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
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });

export const modifyTeacher = (
  setEnrollmentModalOpen,
  payload,
  queryKeyQueryClient,
  queryKeySearchNameValue,
  page,
) =>
  instance
    .put('api/accounts/teacher', {
      targetId: payload.id,
      name: payload.name,
      phoneNumber: payload.phoneNumber,
    })
    .then(() => {
      queryKeyQueryClient.invalidateQueries([
        'teachers',
        queryKeySearchNameValue,
        page - 1,
      ]);
      setEnrollmentModalOpen(false);
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

export const getTeacherByPage = ({ queryKey }) =>
  instance
    .get('/api/members/teachers/paging', {
      params: {
        size: 10,
        page: queryKey[2],
        name: queryKey[1],
      },
    })
    .then((res) => res.data);

export default getAllTeachers;
