import React from 'react';
import StudentItem from '../molecules/StudentItem';

function StudentList() {
  return (
    <div className="w-full">
      <div className="w-[800px] mx-auto">
        <div className="flex items-center justify-between">
          <input type="checkbox" className="w-[16px] h-[16px]" />
          <span className="text-lg font-bold text-hpGray w-[60px] text-center">
            학년
          </span>
          <span className="text-lg font-bold text-hpGray w-[90px]">
            학생 이름
          </span>
          <span className="text-lg font-bold text-hpGray w-[140px]">
            학생 ID(전화번호)
          </span>
          <span className="text-lg font-bold text-hpGray w-[100px]">수정</span>
        </div>
      </div>
      <hr className="h-[0.5px] border-0 bg-black w-[900px] mx-auto mt-2" />
      <div className="w-[800px] mx-auto mt-4">
        <StudentItem grade="2학년" name="조인애" id="010-3433-0652" />
        <StudentItem grade="2학년" name="조인애" id="010-3433-0652" />
        <StudentItem grade="2학년" name="조인애" id="010-3433-0652" />
        <StudentItem grade="2학년" name="조인애" id="010-3433-0652" />
        <StudentItem grade="2학년" name="조인애" id="010-3433-0652" />
        <StudentItem grade="2학년" name="조인애" id="010-3433-0652" />
        <StudentItem grade="2학년" name="조인애" id="010-3433-0652" />
        <StudentItem grade="2학년" name="조인애" id="010-3433-0652" />
        <StudentItem grade="2학년" name="조인애" id="010-3433-0652" />
        <StudentItem grade="2학년" name="조인애" id="010-3433-0652" />
      </div>
      <hr className="h-[0.5px] border-0 bg-black w-[900px] mx-auto mt-2" />
    </div>
  );
}

export default StudentList;
