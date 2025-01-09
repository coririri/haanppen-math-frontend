/* eslint-disable @typescript-eslint/no-empty-function */
import instance from './instance';

const getAllTeachers = async () => instance.get('/api/members/teachers/all');

export const registTeacherAccount = (payload: {
  name: string;
  phoneNumber: string;
}) =>
  instance.post('/api/accounts', {
    name: payload.name,
    phoneNumber: payload.phoneNumber,
    role: 'teacher',
    password: '0000',
  });

export const deleteTeacherAccount = (forDeletedTeacherIds: number[]) =>
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

export const modifyTeacher = (payload: {
  id: number;
  name: string;
  phoneNumber: string;
}) =>
  instance.put('api/accounts/teacher', {
    targetId: payload.id,
    name: payload.name,
    phoneNumber: payload.phoneNumber,
  });

export const getTeacherList = ({
  pageParam,
  queryKey,
}: {
  pageParam: number;
  queryKey: [string, string];
}) =>
  instance.get('/api/members/teachers', {
    params: {
      size: 10,
      cursorIndex: pageParam,
      name: queryKey[1],
    },
  });

export const getTeacherByPage = ({
  queryKey,
}: {
  queryKey: [string, string, number];
}) =>
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
