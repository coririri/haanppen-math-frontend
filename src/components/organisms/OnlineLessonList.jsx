import React, { useState } from 'react';
import { GoTriangleRight, GoTriangleDown } from 'react-icons/go';

function OnlineLessonList({ lessons, lessonInformation }) {
  const [isOpenInformation, setIsOpenInformation] = useState(false);
  return (
    <div className="w-[330px] mx-auto mt-[8px]">
      <h2 className="text-xl font-bold my-1 text-center">수업 제목</h2>

      <div className="my-[2px]">
        {/* 버튼 */}
        <button
          type="button"
          className="text-xl font-bold my-1 flex items-center justify-between w-full bg-gray-100 px-4 py-2 rounded shadow hover:bg-gray-200"
          onClick={() => {
            setIsOpenInformation((prev) => !prev);
          }}
        >
          <span>강의 정보</span>
          {!isOpenInformation && <GoTriangleRight size="36px" />}
          {isOpenInformation && <GoTriangleDown size="36px" />}
        </button>

        {/* 여닫는 컨텐츠 */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpenInformation ? 'max-h-[1000px]' : 'max-h-0'
          }`}
        >
          {/* 내용 */}
          <div>
            <div className="flex border-t-[2px] border-b-[1px] border-solid border-t-black border-b-[#C3C3C3]">
              <span className="block w-[80px] text-center font-bold bg-[#EEEEEE] py-[1px]">
                선생님
              </span>
              <span className="block w-[250px] text-left font-bold py-[1px] pl-4">
                {lessonInformation.teacherName} 선생님
              </span>
            </div>
            <div className="flex border-t-[1px] border-b-[1px] border-solid border-[#C3C3C3]">
              <span className="flex items-center justify-center w-[80px] text-center font-bold bg-[#EEEEEE] py-[1px]">
                강좌 범위
              </span>
              <span className="block w-[250px] text-left font-bold py-[1px] pl-4">
                {lessonInformation.lessoneRange}
              </span>
            </div>
            <div className="flex border-t-[1px] border-b-[1px] border-solid border-[#C3C3C3]">
              <span className="flex items-center justify-center w-[80px] text-center font-bold bg-[#EEEEEE] py-[1px]">
                강좌 설명
              </span>
              <span className="block w-[250px] text-left font-bold py-[1px] pl-4">
                {lessonInformation.lessonDesc}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex bg-[#D9D9D9] py-2">
        <span className="block w-[200px] text-center font-bold text-md">
          강의명
        </span>
        <span className="block w-[50px]  text-center font-bold text-md">
          길이
        </span>
        <span className="block w-[50px]  text-center font-bold text-md" />
      </div>

      {lessons.map((lesson) => (
        <div
          className="flex items-center border-[#D9D9D9] border-b-2 border-solid py-4"
          key={lesson.memoId}
        >
          <span className="block w-[200px] text-center font-bold text-md">
            {lesson.title}
          </span>

          <span className="block w-[50px] mx-[15px]  text-center font-bold text-md  border-solid text-black rounded-xl">
            {lesson.runtime}
          </span>

          <button
            type="button"
            className="mr-2"
            onClick={() => {
              if (lesson.alreadyView === true) {
                //   navigate(
                //     `/online-lesson?courseId=${courseList[selectedClassindex].courseId}&courseName=${courseList[selectedClassindex].courseName}`,
                //   );
              } else {
                alert('수업을 등록하시기 바랍니다.');
              }
            }}
          >
            <span className="block w-[50px]  text-center font-bold text-md border-hpLightBlue border-[1.5px] border-solid text-hpLightBlue rounded-xl">
              Play
            </span>
          </button>
        </div>
      ))}

      {Array(8 - lessons.length)
        .fill(0)
        .map((value, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div
            className="flex items-center  py-4"
            // eslint-disable-next-line react/no-array-index-key
            key={value + index}
          >
            <span className="block w-[200px] text-center font-bold text-md" />

            <span className="block w-[50px] mx-[15px] text-center font-bold text-md  border-solid text-black rounded-xl" />

            <span className="block w-[50px]  text-center font-bold text-md   text-hpLightBlue rounded-xl" />
          </div>
        ))}
    </div>
  );
}

export default OnlineLessonList;
