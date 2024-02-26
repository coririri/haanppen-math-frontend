import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import StudentManagementList from '../molecules/StudentManagementList';

function StudentManagementContainer() {
  const studentList = useSelector((state) => state.student.students);

  const [deletedIndexArr, setDeletedIndexArr] = useState([]);
  return (
    <div className="m-10">
      <div className="w-[42.875rem] h-[3.375rem] flex items-center">
        <div className="w-[7.5rem]">
          <input
            type="checkbox"
            className="w-[1.125rem] h-[1.125rem] mx-auto flex items-center border-hpLightkBlack border-solid border-[0.1rem]"
            disabled
          />
        </div>
        <div className="w-[8rem] flex justify-center">
          <span className="text-xl text-hpGray font-bold">학년</span>
        </div>
        <div className="w-[11.375rem] flex justify-center">
          <span className="text-xl text-hpGray font-bold">이름</span>
        </div>
        <div className="w-[16rem] flex justify-center">
          <span className="text-xl text-hpGray font-bold">
            학생 ID(전화 번호)
          </span>
        </div>
        <div className="w-[11rem] flex justify-center text-hpGray font-bold">
          수정
        </div>
      </div>
      <div className="w-[45rem] h-[20.25rem] overflow-y-auto border-hpBlack border-solid border-y-[0.125rem]">
        {deletedIndexArr.map((deleted, index) => (
          <div
            key={studentList[index].phoneNumber}
            className="border-hpGray border-solid border-b-[0.1rem]"
          >
            <StudentManagementList
              setDeletedIndexArr={setDeletedIndexArr}
              index={index}
              checked={deleted}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentManagementContainer;
