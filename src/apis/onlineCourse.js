/* eslint-disable @typescript-eslint/no-empty-function */
import instance from './instance';

const enrollOnlineCourse = async (courseName, teacherId, students) =>
  instance.post('/api/online-courses', {
    courseName,
    teacherId,
    students,
  });

export const getOnlineCoursesById = (teacherId, setCourseListData) =>
  instance.get(`/api/online-courses/teachers/${teacherId}`).then((response) => {
    setCourseListData(response.data);
  });

export const getOwnOnlineCourses = () => instance.get(`/api/online-courses/my`);

export const deleteOnlineCourses = async (courseId) => {
  await instance.delete(`/api/online-courses/${courseId}`);
};

export const getAllOnlineCourses = (setCourseListData) =>
  instance.get('/api/online-courses').then((response) => {
    setCourseListData(response.data);
  });

export const putOnlineCourseStudents = async (courseId, students) => {
  await instance
    .put(`/api/online-courses/${courseId}/students`, {
      studentIds: students,
    })
    .then(() => {});
};

export const putOnlineCourseNameAndTeacher = async (
  courseId,
  courseName,
  newTeacherId,
) => {
  await instance
    .put(`/api/online-courses/${courseId}/info`, {
      courseName,
      newTeacherId,
    })
    .then(() => {});
};

export default enrollOnlineCourse;
