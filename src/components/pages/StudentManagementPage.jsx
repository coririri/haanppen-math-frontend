import React, { useRef, useState } from 'react';
import { AiOutlineSmile, AiOutlineSearch } from 'react-icons/ai';
import SlideBar from '../molecules/SlideBar';
import TextButton from '../atoms/TextButton';
import IconButton from '../atoms/IconButton';
import StudentManagementList from '../molecules/StudentManagementList';

function StudentManagementPage() {
  const [managementIndex, setManagementIndex] = useState([true, false, false]);
  const [choosenGradeIndex, setChoosenGradeIndex] = useState([
    true,
    false,
    false,
  ]);
  const { searchRef } = useRef();
  return (
    <div className="w-full text-center">
      <div className="inline-block mt-4">
        <SlideBar
          num={3}
          firstText="학생 관리"
          secondText="반 관리"
          thirdText="강사 관리"
          isClickArr={managementIndex}
          setIsClickArr={setManagementIndex}
        />
      </div>

      <hr className="h-[2px] border-0 bg-hpGray w-[700px] mx-auto mt-4" />
      <div className="mt-4 flex items-center justify-between w-[250px] mx-auto">
        <TextButton
          color="white"
          shape="square"
          size="small"
          isClick={choosenGradeIndex[0]}
          handleClick={() => {
            setChoosenGradeIndex([true, false, false]);
          }}
        >
          초
        </TextButton>
        <TextButton
          color="white"
          shape="square"
          size="small"
          isClick={choosenGradeIndex[1]}
          handleClick={() => {
            setChoosenGradeIndex([false, true, false]);
          }}
        >
          중
        </TextButton>
        <TextButton
          color="white"
          shape="square"
          size="small"
          isClick={choosenGradeIndex[2]}
          handleClick={() => {
            setChoosenGradeIndex([false, false, true]);
          }}
        >
          고
        </TextButton>
        <span className="text-3xl font-bold">123명</span>
      </div>
      <hr className="h-[2px] border-0 bg-hpGray w-[700px] mx-auto mt-4" />
      <div className="flex items-center  w-[550px] mx-auto justify-between mt-4">
        <div>
          <IconButton
            bgColor="blue"
            icon={<AiOutlineSmile size="26px" color="white" />}
            text="학생 등록"
            handleClick={() => {
              console.log('학생 등록');
            }}
          />
        </div>
        <div>
          <div className="relative inline-block">
            <input
              type="text"
              className="w-[200px] h-[42px] leading-[21px] border-[2.5px] border-solid border-hpGray pr-2 pl-6 rounded-xl focus-visible:outline-0 text-xl"
              placeholder="학생 이름 검색"
              ref={searchRef}
            />
            <button
              className="absolute bg-bjsBlue text-lg p-1 pl-3 text-white right-0 top-[2px] rounded-r-xl "
              type="button"
              aria-label="검색"
              onClick={() => {
                console.log('검색');
              }}
            >
              <AiOutlineSearch size="28px" className="mr-2" color="gray" />
            </button>
          </div>
        </div>
      </div>
      <StudentManagementList />
    </div>
  );
}

export default StudentManagementPage;
