import React from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/extensions
import QueryBadge from '../atoms/QueryBadge';

interface Owner {
  memberId: number;
  memberName: string;
  memberGrade: number | null;
  role: 'student' | 'teacher';
}

interface Target {
  memberId: number;
  memberName: string;
  memberGrade: number | null;
  role: 'student' | 'teacher';
}

interface QuestionProps {
  questionId: number;
  title: string;
  registeredDateTime: string;
  solved: boolean;
  commentCount: number;
  viewCount: number;
  owner: Owner;
  target: Target | null;
}

interface QueyListProps {
  question: QuestionProps;
  isStudent: boolean;
}

function QueryList({ question, isStudent }: QueyListProps) {
  const navigate = useNavigate();

  if (isStudent)
    return (
      <button
        className="block"
        type="button"
        onClick={() => {
          navigate(`/question/${question.questionId}`);
        }}
      >
        <div className="font-bold text-md bg-white py-2 flex items-center min-h-[40px] border-b-2 border-solid border-[#C9C9C9]">
          <span className="inline-block w-[60px] text-center ml-[10px]">
            <QueryBadge isSolved={question.solved} isStudent />
          </span>
          <span className="inline-block w-[165px] text-center">
            {question.title}
          </span>
          <span className="inline-block w-[80px] text-center mr-[10px]">
            {question.target === null ? '지정안함' : question.target.memberName}
          </span>
        </div>
      </button>
    );
  return (
    <button
      className="block"
      type="button"
      onClick={() => {
        navigate(`/question/${question.questionId}`);
      }}
    >
      <div className="font-bold text-md bg-white py-2 flex items-center min-h-[40px] border-b-2 border-solid border-[#C9C9C9]">
        <span className="inline-block w-[60px] text-center ml-[10px]">
          <QueryBadge isSolved={question.solved} isStudent />
        </span>
        <span className="inline-block w-[165px] text-center">
          {question.title}
        </span>
        <span className="inline-block w-[80px] text-center">
          {question.owner.memberName}
        </span>
        <span className="inline-block w-[80px] text-center mr-[10px]">
          {question.target === null ? '지정안함' : question.target.memberName}
        </span>
      </div>
    </button>
  );
}

export default QueryList;
