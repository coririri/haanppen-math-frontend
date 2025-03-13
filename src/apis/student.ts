/* eslint-disable @typescript-eslint/no-empty-function */
import { AxiosError } from 'axios';
import { StudentType } from '../types/studentType';
import instance from './instance';

export const getStudentList = ({
  queryKey,
  pageParam,
}: {
  queryKey: [string, boolean[], string];
  pageParam: number;
}) => {
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

export const deleteStudent = (forDeletedStudentIds: number[]) =>
  instance.delete('api/accounts', {
    data: {
      targetIds: forDeletedStudentIds,
    },
  });

export const modifyStudent = (payload: StudentType) =>
  instance.put('api/accounts/student', {
    studentId: payload.id,
    name: payload.name,
    phoneNumber: payload.phoneNumber,
    grade: payload.grade,
  });

const studentAccountRegist = (payload: {
  name: string;
  phoneNumber: string;
  grade: number;
}) =>
  instance.post('/api/accounts', {
    name: payload.name,
    grade: payload.grade,
    phoneNumber: payload.phoneNumber,
    role: 'student',
    password: '0000',
  });

export const getAllStudents = () => instance.get('/api/members/students/all');

export const getCourseStudents = async (courseId: number) =>
  instance.get(`/api/manage/courses/${courseId}`);

export const getOnlineCourseStudents = async (courseId: number) =>
  instance.get(`/api/online-courses/${courseId}`);

export const getStudentByPage = async ({
  queryKey,
}: {
  queryKey: ['students', number, string, number];
}) => {
  const [, gradeIndex, name, page] = queryKey;

  const gradeConfig = [
    { startGrade: 0, endGrade: 11 },
    { startGrade: 0, endGrade: 5 },
    { startGrade: 6, endGrade: 8 },
    { startGrade: 9, endGrade: 11 },
  ];

  const { startGrade, endGrade } = gradeConfig[gradeIndex] || gradeConfig[0];

  try {
    const response = await instance.get('/api/members/students/paging', {
      params: { size: 10, page, startGrade, endGrade, name },
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>; // AxiosError 타입 적용
    console.error('Error fetching students:', axiosError);

    throw new Error(
      axiosError.response?.data?.message || 'Failed to fetch students',
    );
  }
};

export default studentAccountRegist;
