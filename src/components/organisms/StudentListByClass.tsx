import React from 'react';
import StudentListByGradeDropdown from '../molecules/StudentListByGradeDropdown';
import { StudentByGradeType } from '../../types/studentType';

interface StudentListByClassProps {
  type: 'entire' | 'other'; // Type could be 'entire' or 'myCourse'
  differntCourseStudents: StudentByGradeType[];
  myCourseStudents: StudentByGradeType[];
  setDifferntCourseStudents: React.Dispatch<
    React.SetStateAction<StudentByGradeType[]>
  >;
  setMyCourseStudents: React.Dispatch<
    React.SetStateAction<StudentByGradeType[]>
  >;
  setMyStudentsNum: React.Dispatch<React.SetStateAction<number>>;
  setDifferentStudentsNum: React.Dispatch<React.SetStateAction<number>>;
}

function StudentListByClass({
  type,
  differntCourseStudents,
  myCourseStudents,
  setDifferntCourseStudents,
  setMyCourseStudents,
  setMyStudentsNum,
  setDifferentStudentsNum,
}: StudentListByClassProps) {
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
