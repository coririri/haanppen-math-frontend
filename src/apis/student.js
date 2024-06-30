import instance from './instance';

export const getStudentList = ({ queryKey, pageParam, name = '' }) => {
  console.log(queryKey[1]);
  if (queryKey[1][0] === true)
    return instance.get('/api/members/students', {
      params: {
        size: 10,
        cursorIndex: pageParam,
        startGrade: 0,
        endGrade: 11,
        name,
      },
    });

  if (queryKey[1][1] === true)
    return instance.get('/api/members/students', {
      params: {
        size: 10,
        cursorIndex: pageParam,
        startGrade: 0,
        endGrade: 5,
        name,
      },
    });

  if (queryKey[1][2] === true)
    return instance.get('/api/members/students', {
      params: {
        size: 10,
        cursorIndex: pageParam,
        startGrade: 6,
        endGrade: 8,
        name,
      },
    });

  if (queryKey[1][3] === true)
    return instance.get('/api/members/students', {
      params: {
        size: 10,
        cursorIndex: pageParam,
        startGrade: 9,
        endGrade: 11,
        name,
      },
    });
  return instance.get('/api/members/students', {
    params: {
      size: 10,
      cursorIndex: pageParam,
      startGrade: 0,
      endGrade: 16,
      name: queryKey[2],
    },
  });
};

export const deleteStudent = (forDeletedStudentIds) =>
  instance
    .delete('api/accounts', {
      data: {
        targetIds: forDeletedStudentIds,
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

export const modifyStudent = (
  setEnrollmentModalOpen,
  payload,
  queryClient,
  choosenGradeIndex,
  searchNameValue,
) =>
  instance
    .put('api/accounts/student', {
      data: {
        studentId: payload.id,
        name: payload.name,
        phoneNumber: payload.phoneNumber,
        grade: payload.modificationGrade,
      },
    })
    .then((response) => {
      queryClient.invalidateQueries([
        'studentList',
        choosenGradeIndex,
        searchNameValue,
      ]);
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

const studentAccountRegist = (
  setEnrollmentModalOpen,
  payload,
  queryClient,
  choosenGradeIndex,
  searchNameValue,
) => {
  console.log(choosenGradeIndex);
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

      queryClient.invalidateQueries([
        'studentList',
        choosenGradeIndex,
        searchNameValue,
      ]);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default studentAccountRegist;
