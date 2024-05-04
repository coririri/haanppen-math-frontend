import React from 'react';
import { BsFillTriangleFill } from 'react-icons/bs';

function TeacherCarousel({
  teacherList,
  selectedTeacherindex,
  setSelectedTeacherindexIndex,
}) {
  const handleChangeSelectedTeacherindex = (flag) => {
    if (flag === 'left') {
      if (selectedTeacherindex === 0) {
        setSelectedTeacherindexIndex(teacherList.length - 1);
      } else {
        setSelectedTeacherindexIndex((prev) => prev - 1);
      }
    } else if (flag === 'right') {
      if (selectedTeacherindex === teacherList.length - 1) {
        setSelectedTeacherindexIndex(0);
      } else {
        setSelectedTeacherindexIndex((prev) => prev + 1);
      }
    }
  };

  return (
    <div>
      <div className="border-solid border-[1.5px] border-black flex items-center justify-between px-4 rounded-3xl w-[233px] h-[42px]">
        <button
          type="button"
          aria-label="왼쪽 넘기기"
          onClick={() => {
            handleChangeSelectedTeacherindex('left');
          }}
        >
          <BsFillTriangleFill
            className="origin-center rotate-[270deg]"
            size="20px"
            color="#BCBCBC"
          />
        </button>
        <span className="h-[42px] leading-[42px] text-lg font-bold overflow-hidden">
          {teacherList[selectedTeacherindex]} 선생님
        </span>
        <button
          type="button"
          aria-label="왼쪽 넘기기"
          onClick={() => {
            handleChangeSelectedTeacherindex('right');
          }}
        >
          <BsFillTriangleFill
            className="origin-center rotate-[90deg]"
            size="20px"
            color="#BCBCBC"
          />
        </button>
      </div>
    </div>
  );
}

export default TeacherCarousel;
