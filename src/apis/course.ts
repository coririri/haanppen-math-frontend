/* eslint-disable @typescript-eslint/no-empty-function */
import { CourseType } from '../types/courseType';
import instance from './instance';

const enrollCourse = async (
  courseName: string,
  teacherId: number,
  students: number[],
) =>
  instance.post('/api/manage/courses', {
    courseName,
    teacherId,
    students,
  });

export const getCoursesById = (
  teacherId: number,
  setCourseListData: React.Dispatch<React.SetStateAction<CourseType[]>>,
) =>
  instance.get(`/api/courses/teachers/${teacherId}`).then((response) => {
    setCourseListData(response.data);
  });

export const getOwnCourses = () => instance.get(`/api/courses/my`);

export const deleteCourses = async (courseId: number) =>
  instance.delete(`/api/manage/courses/${courseId}`);

export const getAllCourses = (
  setCourseListData: React.Dispatch<React.SetStateAction<CourseType[]>>,
) =>
  instance.get('/api/courses').then((response) => {
    setCourseListData(response.data);
  });

export const putCourseStudents = async (courseId: number, students: number[]) =>
  instance
    .put(`/api/course/${courseId}/students`, {
      studentIds: students,
    })
    .then(() => {});

export const putCourseNameAndTeacher = async (
  courseId: number,
  courseName: string,
  newTeacherId: number,
) =>
  instance
    .put(`/api/manage/courses/${courseId}`, {
      courseName,
      newTeacherId,
    })
    .then(() => {});

export default enrollCourse;
