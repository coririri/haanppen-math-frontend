/* eslint-disable @typescript-eslint/no-empty-function */
import instance from './instance';

const enrollCourse = async (courseName, teacherId, students) =>
  instance.post('/api/manage/courses', {
    courseName,
    teacherId,
    students,
  });

export const getCoursesById = (teacherId, setCourseListData) =>
  instance.get(`/api/courses/teachers/${teacherId}`).then((response) => {
    setCourseListData(response.data);
  });

export const getOwnCourses = () => instance.get(`/api/courses/my`);

export const deleteCourses = async (courseId) => {
  await instance.delete(`/api/manage/courses/${courseId}`);
};

export const getMyCourse = (
  courseId,
  teacherList,
  setSelectedTeacherindexIndex,
  setCourseName,
) => {
  instance.get(`/api/manage/courses/${courseId}`).then((response) => {
    const { teacherPreview } = response.data;

    teacherList.forEach((teacher, index) => {
      if (teacher?.name === teacherPreview.teacherName) {
        setSelectedTeacherindexIndex(index);
      }
    });
    setCourseName(response.data.courseName);
  });
};

export const getAllCourses = (setCourseListData) =>
  instance.get('/api/courses').then((response) => {
    setCourseListData(response.data);
  });

export const putCourseStudents = async (courseId, students) => {
  await instance
    .put(`/api/course/${courseId}/students`, {
      studentIds: students,
    })
    .then(() => {});
};

export const putCourseNameAndTeacher = async (
  courseId,
  courseName,
  newTeacherId,
) => {
  await instance
    .put(`/api/manage/courses/${courseId}`, {
      courseName,
      newTeacherId,
    })
    .then(() => {});
};

export default enrollCourse;
