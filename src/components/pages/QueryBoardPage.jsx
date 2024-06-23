import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillEdit } from 'react-icons/ai';
import QueryBox from '../molecules/QueryBox';
import hw1 from '../../assests/hw1.jpg';
import hw3 from '../../assests/hw3.jpg';
import hw4 from '../../assests/hw4.jpg';
import IconButton from '../atoms/IconButton';

function QueryBoardPage() {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <div className="mt-5 relative">
        <div className="w-[230px] h-[40px] border-solid border-black border-[1.75px] rounded-lg text-center mx-auto">
          <span className="text-2xl font-bold leading-10">전체 질문</span>
        </div>
        <div className="absolute right-[320px] top-[-1px]">
          <IconButton
            bgColor="white"
            icon={<AiFillEdit size="20px" className="text-black" />}
            text="질문 작성"
            handleClick={() => {
              navigate('/write-query');
            }}
          />
        </div>
      </div>
      <hr className="h-[1px] border-0 bg-hpGray w-[600px] mx-auto mt-3" />
      <div className="w-[750px] mx-auto mt-4">
        <QueryBox
          id={1}
          imgSrc={hw1}
          grade={8}
          studentName="최수정"
          isSolved={false}
          teacherName="권나희"
        />
        <QueryBox
          id={2}
          imgSrc={hw4}
          grade={8}
          studentName="최수정"
          isSolved={false}
          teacherName="권나희"
        />
        <QueryBox
          id={3}
          imgSrc={hw3}
          grade={8}
          studentName="최수정"
          isSolved={false}
          teacherName="권나희"
        />
      </div>
    </div>
  );
}

export default QueryBoardPage;
