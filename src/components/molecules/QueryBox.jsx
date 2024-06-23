import React from 'react';
import { useNavigate } from 'react-router-dom';
import QueryBadge from '../atoms/QueryBadge';
import gradeTransfrom from '../../utils/gradeTransform';

function QueryBox({ id, imgSrc, grade, studentName, isSolved, teacherName }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => {
        navigate(`/question/${id}`);
      }}
    >
      <div className="w-[750px] mt-6">
        <div className="flex justify-between items-center">
          <div className="w-[165px] flex justify-between items-center">
            <QueryBadge isSolved={isSolved} />
            <div>
              <span className="font-bold"> {gradeTransfrom(grade)} </span>
              <span className="font-bold">{studentName}</span>
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
