import React from 'react';
import StudentListByGradeDropdown from '../molecules/StudentListByGradeDropdown';

function StudentListByClass({
  type,
  differntCourseStudents,
  myCourseStudents,
  setDifferntCourseStudents,
  setMyCourseStudents,
  setMyStudentsNum,
  setDifferentStudentsNum,
}) {
  if (type === 'entire') {
    return (
      <div className="border-solid border-black  border-[1.1px] rounded-lg w-[280px] h-[450px]  bg-hpLightGray overflow-auto">
        {differntCourseStudents.map((course) => {
          if (course.students.length > 0) {
            return (
              <div key={course.grade + 1}>
                <StudentListByGradeDropdown
                  type={type}
                  grade={course.grade + 1}
                  students={course.students}
                  differntCourseStudents={differntCourseStudents}
                  myCourseStudents={myCourseStudents}
                  setDifferntCourseStudents={setDifferntCourseStudents}
                  setMyCourseStudents={setMyCourseStudents}
                  setMyStudentsNum={setMyStudentsNum}
                  setDifferentStudentsNum={setDifferentStudentsNum}
                />
              </div>
            );
          }
          return '';
        })}
      </div>
    );
  }

  return (
    <div className="border-solid border-black  border-[1.1px] rounded-lg w-[280px] h-[450px]  bg-hpLightGray overflow-auto">
      {myCourseStudents.map((course) => {
        if (course.students.length > 0) {
          return (
            <div key={course.grade + 1}>
              <StudentListByGradeDropdown
                type={type}
                grade={course.grade + 1}
                students={course.students}
                differntCourseStudents={differntCourseStudents}
                myCourseStudents={myCourseStudents}
                setDifferntCourseStudents={setDifferntCourseStudents}
                setMyCourseStudents={setMyCourseStudents}
                setMyStudentsNum={setMyStudentsNum}
                setDifferentStudentsNum={setDifferentStudentsNum}
              />
            </div>
          );
        }
        return '';
      })}
    </div>
  );
}

export default StudentListByClass;
