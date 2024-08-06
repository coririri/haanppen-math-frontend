import instance from './instance';

export const getStudentList = ({ queryKey, pageParam }) => {
  if (queryKey[1][0] === true)
    return instance.get('/api/members/students', {
      params: {
        size: 10,
        cursorIndex: pageParam,
        startGrade: 0,
        endGrade: 11,
        name: queryKey[2],
      },
    });

  if (queryKey[1][1] === true)
    return instance.get('/api/members/students', {
      params: {
        size: 10,
        cursorIndex: pageParam,
        startGrade: 0,
        endGrade: 5,
        name: queryKey[2],
      },
    });

  if (queryKey[1][2] === true)
    return instance.get('/api/members/students', {
      params: {
        size: 10,
        cursorIndex: pageParam,
        startGrade: 6,
        endGrade: 8,
        name: queryKey[2],
      },
    });

  if (queryKey[1][3] === true)
    return instance.get('/api/members/students', {
      params: {
        size: 10,
        cursorIndex: pageParam,
        startGrade: 9,
        endGrade: 11,
        name: queryKey[2],
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
  page,
  queryKeyQueryClient,
  queryKeyChoosenGradeIndex,
  queryKeySearchNameValue,
) =>
  instance
    .put('api/accounts/student', {
      studentId: payload.id,
      name: payload.name,
      phoneNumber: payload.phoneNumber,
      grade: payload.grade,
    })
    .then((response) => {
      queryKeyQueryClient.invalidateQueries([
        'students',
        queryKeyChoosenGradeIndex,
        queryKeySearchNameValue,
        page - 1,
      ]);
      setEnrollmentModalOpen(false);
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
  page,
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
        'students',
        choosenGradeIndex,
        searchNameValue,
        page - 1,
      ]);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getAllStudents = async (
  setEntireStudents,
  setEntireStudentsNum,
) => {
  await instance.get('/api/members/students/all', {}).then((response) => {
    const students = response.data;

    const newStudents = [
      {
        grade: 0,
        students: [],
      },
      {
        grade: 1,
        students: [],
      },
      {
        grade: 2,
        students: [],
      },
      {
        grade: 3,
        students: [],
      },
      {
        grade: 4,
        students: [],
      },
      {
        grade: 5,
        students: [],
      },
      {
        grade: 6,
        students: [],
      },
      {
        grade: 7,
        students: [],
      },
      {
        grade: 8,
        students: [],
      },
      {
        grade: 9,
        students: [],
      },
      {
        grade: 10,
        students: [],
      },
      {
        grade: 11,
        students: [],
      },
    ];
    let tempStudentsNum = 0;
    students.forEach((student) => {
      newStudents[student.grade].students.push({
        id: student.id,
        name: student.name,
      });
      tempStudentsNum += 1;
    });
    setEntireStudentsNum(tempStudentsNum);
    setEntireStudents(newStudents);
  });
};

export const getMyCourseStudents = async (
  courseId,
  setMyCourseStudents,
  setMyStudentsNum,
) => {
  await instance.get(`/api/manage/courses/${courseId}`).then((response) => {
    const { studentPreviews } = response.data;

    const newStudents = [
      {
        grade: 0,
        students: [],
      },
      {
        grade: 1,
        students: [],
      },
      {
        grade: 2,
        students: [],
      },
      {
        grade: 3,
        students: [],
      },
      {
        grade: 4,
        students: [],
      },
      {
        grade: 5,
        students: [],
      },
      {
        grade: 6,
        students: [],
      },
      {
        grade: 7,
        students: [],
      },
      {
        grade: 8,
        students: [],
      },
      {
        grade: 9,
        students: [],
      },
      {
        grade: 10,
        students: [],
      },
      {
        grade: 11,
        students: [],
      },
    ];
    let tempStudentsNum = 0;

    studentPreviews.forEach((student) => {
      newStudents[student.grade].students.push({
        id: student.studentId,
        name: student.studentName,
      });
      tempStudentsNum += 1;
    });
    setMyCourseStudents(newStudents);
    setMyStudentsNum(tempStudentsNum);
  });
};

export const getStudentByPage = ({ queryKey }) => {
  if (queryKey[1][0] === true)
    return instance
      .get('/api/members/students/paging', {
        params: {
          size: 10,
          page: queryKey[3],
          startGrade: 0,
          endGrade: 11,
          name: queryKey[2],
        },
      })
      .then((res) => res.data);

  if (queryKey[1][1] === true)
    return instance
      .get('/api/members/students/paging', {
        params: {
          size: 10,
          page: queryKey[3],
          startGrade: 0,
          endGrade: 5,
          name: queryKey[2],
        },
      })
      .then((res) => res.data);

  if (queryKey[1][2] === true)
    return instance
      .get('/api/members/students/paging', {
        params: {
          size: 10,
          page: queryKey[3],
          startGrade: 6,
          endGrade: 8,
          name: queryKey[2],
        },
      })
      .then((res) => res.data);

  if (queryKey[1][3] === true)
    return instance
      .get('/api/members/students/paging', {
        params: {
          size: 10,
          page: queryKey[3],
          startGrade: 9,
          endGrade: 11,
          name: queryKey[2],
        },
      })
      .then((res) => res.data);

  return instance
    .get('/api/members/students/paging', {
      params: {
        size: 10,
        page: queryKey[3],
        startGrade: 0,
        endGrade: 11,
        name: queryKey[2],
      },
    })
    .then((res) => res.data);
};

export default studentAccountRegist;
