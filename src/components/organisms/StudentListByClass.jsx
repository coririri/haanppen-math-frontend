import React from 'react';
import StudentListByGradeDropdown from '../molecules/StudentListByGradeDropdown';

function StudentListByClass({ type, entireClassData, currentClassData }) {
  if (type === 'entire')
    return (
      <div className="border-solid border-black  border-[1.1px] rounded-lg w-[280px] h-[450px]  bg-hpLightGray overflow-auto">
        {entireClassData.map((course) => (
          <div key={course.grade}>
            <StudentListByGradeDropdown
              type={type}
              grade={course.grade}
              students={course.students}
              entireClassData={entireClassData}
              currentClassData={currentClassData}
            />
          </div>
        ))}
      </div>
    );

  return (
    <div className="border-solid border-black  border-[1.1px] rounded-lg w-[280px] h-[450px]  bg-hpLightGray overflow-auto">
      {currentClassData.map((course) => (
        <div key={course.grade}>
          <StudentListByGradeDropdown
            type={type}
            grade={course.grade}
            students={course.students}
            entireClassData={entireClassData}
            currentClassData={currentClassData}
          />
        </div>
      ))}
    </div>
  );
}

export default StudentListByClass;
