import React from 'react';
import StudentItem from '../molecules/StudentItem';
import { StudentType } from '../../types/studentType';

interface StudentListProps {
  students: StudentType[];
  setForDeletedStudentIds: React.Dispatch<React.SetStateAction<number[]>>;
  page: number;
  choosenGradeIndex: number;
  searchNameValue: string;
}

function StudentList({
  students,
  setForDeletedStudentIds,
  page,
  choosenGradeIndex,
  searchNameValue,
}: StudentListProps) {
  return (
    <div className="w-full">
      <div className="w-[800px] mx-auto">
        <div className="flex items-center justify-between">
          {/* <input type="checkbox" className="w-[16px] h-[16px]" disabled /> */}
          <div className="w-[16px] h-[16px]" />
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
        {students.map((student) => (
          <StudentItem
            key={student.id}
            id={student.id}
            page={page}
            grade={student.grade}
            name={student.name}
            phoneNumber={student.phoneNumber}
            setForDeletedStudentIds={setForDeletedStudentIds}
            choosenGradeIndex={choosenGradeIndex}
            searchNameValue={searchNameValue}
          />
        ))}
        {Array(10 - students.length)
          .fill(0)
          .map((value, index) => {
            const emptyKey = Date.now() + index;
            return (
              <div key={emptyKey}>
                <div>
                  <div className="flex items-center justify-between my-2 h-[28.795px]">
                    <input className="w-[16px] h-[16px]" />
                    <span className="text-lg font-bold text-black w-[60px] text-center" />
                    <span className="text-lg font-bold text-black w-[90px] text-center" />
                    <span className="text-lg font-bold text-black w-[140px]" />
                    <div className="w-[100px]" />
                  </div>
                  <hr className="h-[0.5px] border-0  w-[800px] mx-auto mt-2" />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default StudentList;
