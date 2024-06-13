import React from 'react';
import StudentListByGradeDropdown from '../molecules/StudentListByGradeDropdown';

function StudentListByClass() {
  return (
    <div className="border-solid border-black  border-[1.1px] rounded-lg w-[280px] h-[450px]  bg-hpLightGray">
      <StudentListByGradeDropdown />
      <StudentListByGradeDropdown />
      <StudentListByGradeDropdown />
      <StudentListByGradeDropdown />
    </div>
  );
}

export default StudentListByClass;
