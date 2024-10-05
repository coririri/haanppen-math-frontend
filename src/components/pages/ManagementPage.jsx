import React, { useState } from 'react';
import SlideBar from '../molecules/SlideBar';
import StudentManagementPage from './StudentManagementPage';
import TeacherManagementPage from './TeacherManagementPage';
import CourseManagementPage from './CourseManagementPage';

function ManagementPage() {
  const [adminManagementIndex, setAdminManagementIndex] = useState([
    true,
    false,
    false,
  ]);
  const [teacherManagementIndex, setTeacherManagementIndex] = useState([
    true,
    false,
  ]);
  const role = localStorage.getItem('role');

  if (role === 'ADMIN')
    return (
      <div className="w-full text-center">
        <div className="inline-block mt-2">
          <SlideBar
            num={3}
            firstText="학생 관리"
            secondText="반 관리"
            thirdText="강사 관리"
            isClickArr={adminManagementIndex}
            setIsClickArr={setAdminManagementIndex}
          />
        </div>
        {adminManagementIndex[0] === true && <StudentManagementPage />}
        {adminManagementIndex[1] === true && <CourseManagementPage />}
        {adminManagementIndex[2] === true && <TeacherManagementPage />}
      </div>
    );

  return (
    <div className="w-full text-center">
      <div className="inline-block mt-2">
        <SlideBar
          num={2}
          firstText="학생 관리"
          secondText="반 관리"
          isClickArr={teacherManagementIndex}
          setIsClickArr={setTeacherManagementIndex}
        />
      </div>
      {teacherManagementIndex[0] === true && <StudentManagementPage />}
      {teacherManagementIndex[1] === true && <CourseManagementPage />}
    </div>
  );
}

export default ManagementPage;
