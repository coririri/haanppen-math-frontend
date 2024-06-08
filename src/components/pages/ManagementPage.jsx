import React, { useState } from 'react';
import SlideBar from '../molecules/SlideBar';
import StudentManagementPage from './StudentManagementPage';

function ManagementPage() {
  const [managementIndex, setManagementIndex] = useState([true, false, false]);

  return (
    <div className="w-full text-center">
      <div className="inline-block mt-2">
        <SlideBar
          num={3}
          firstText="학생 관리"
          secondText="반 관리"
          thirdText="강사 관리"
          isClickArr={managementIndex}
          setIsClickArr={setManagementIndex}
        />
      </div>
      {managementIndex[0] === true && <StudentManagementPage />}
    </div>
  );
}

export default ManagementPage;
