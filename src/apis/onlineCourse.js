/* eslint-disable @typescript-eslint/no-empty-function */
import instance from './instance';

const enrollOnlineCourse = async (courseName, teacherId, students) =>
  instance.post('/api/online-courses', {
    courseName,
    teacherId,
    students,
  });

export const getAllOnlineCourses = (setCourseListData) =>
  instance.get('/api/online-courses').then((response) => {
    setCourseListData(response.data);
  });

export const getOnlineCoursesById = (teacherId, setCourseListData) =>
  instance.get(`/api/online-courses/teachers/${teacherId}`).then((response) => {
    setCourseListData(response.data);
  });

export const getOwnOnlineCourses = () => instance.get(`/api/online-courses/my`);

export const deleteOnlineCourses = async (courseId) => {
  await instance.delete(`/api/online-courses/${courseId}`);
};

export const getMyOnlineCourse = (
  courseId,
  teacherList,
  setSelectedTeacherindexIndex,
  setCourseName,
) => {
  instance.get(`/api/online-courses/${courseId}`).then((response) => {
    const { teacherPreview } = response.data;

    teacherList.forEach((teacher, index) => {
      if (teacher?.name === teacherPreview.teacherName) {
        setSelectedTeacherindexIndex(index);
      }
    });
    setCourseName(response.data.courseName);
  });
};

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

export const getMyOnlineCourseStudents = async (
  courseId,
  setMyCourseStudents,
  setMyStudentsNum,
) => {
  await instance.get(`/api/online-courses/${courseId}`).then((response) => {
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
      if (student)
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

export default enrollOnlineCourse;
