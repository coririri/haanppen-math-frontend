/* eslint-disable @typescript-eslint/no-empty-function */
import { CourseType } from '../types/courseType';
import instance from './instance';

const enrollOnlineCourse = async (
  courseName: string,
  teacherId: number,
  students: number[],
) =>
  instance.post('/api/online-courses', {
    courseName,
    teacherId,
    students,
  });

export const getOnlineCoursesById = (
  teacherId: number,
  setCourseListData: React.Dispatch<React.SetStateAction<CourseType[]>>,
) =>
  instance.get(`/api/online-courses/teachers/${teacherId}`).then((response) => {
    setCourseListData(response.data);
  });

export const getOwnOnlineCourses = () => instance.get(`/api/online-courses/my`);

export const deleteOnlineCourses = async (courseId: number) => {
  await instance.delete(`/api/online-courses/${courseId}`);
};

export const getAllOnlineCourses = (
  setCourseListData: React.Dispatch<React.SetStateAction<CourseType[]>>,
) =>
  instance.get('/api/online-courses').then((response) => {
    setCourseListData(response.data);
  });

export const putOnlineCourseStudents = async (
  courseId: number,
  students: number[],
) => {
  await instance
    .put(`/api/online-courses/${courseId}/students`, {
      studentIds: students,
    })
    .then(() => {});
};

export const putOnlineCourseNameAndTeacher = async (
  courseId: number,
  courseName: string,
  newTeacherId: number,
) => {
  await instance
    .put(`/api/online-courses/${courseId}/info`, {
      courseName,
      newTeacherId,
    })
    .then(() => {});
};

export default enrollOnlineCourse;
