import React from 'react';
import { useNavigate } from 'react-router-dom';
import QueryBadge from '../atoms/QueryBadge';
import gradeTransfrom from '../../utils/gradeTransform';

interface QueryBoxProps {
  id: number;
  imgSrc: string;
  grade: number;
  studentName: string;
  isSolved: boolean;
  teacherName: string;
  isStudent: boolean;
}

function QueryBox({
  id,
  imgSrc,
  grade,
  studentName,
  isSolved,
  teacherName,
  isStudent,
}: QueryBoxProps) {
  const navigate = useNavigate();
  if (isStudent) {
    return (
      <button
        type="button"
        onClick={() => {
          navigate(`/question/${id}`);
        }}
      >
        <div className="w-[400px] mt-2">
          <div className="flex justify-between items-center">
            <div className="w-[165px] flex justify-between items-center ml-2">
              <QueryBadge isSolved={isSolved} />
            </div>
            <div>
              <span className="font-bold mr-2">{teacherName} 선생님</span>
            </div>
          </div>
          <div className="mt-2">
            <img src={imgSrc} alt="학생 질문 문제" className="w-[400px]" />
          </div>
        </div>
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={() => {
        navigate(`/question/${id}`);
      }}
    >
      <div className="w-[750px] mt-6">
        <div className="flex justify-between items-center">
          <div className=" flex justify-between items-center">
            <QueryBadge isSolved={isSolved} />
            <div className="ml-4">
              <span className="font-bold mr-[5px]">
                {gradeTransfrom(grade + 1)}
              </span>
              <span className="font-bold ml-[2px]">{studentName}</span>
            </div>
          </div>
          <div>
            <span className="font-bold">{teacherName} 선생님</span>
          </div>
        </div>
        <div className="mt-2">
          <img src={imgSrc} alt="학생 질문 문제" className="w-[750px]" />
        </div>
      </div>
    </button>
  );
}

export default QueryBox;
