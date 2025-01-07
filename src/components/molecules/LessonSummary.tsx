import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LessonOverviewType } from '../../types/LessonOverviewType';

interface LessonSummaryProps {
  lessonOverviewData: LessonOverviewType; // 강좌의 개요 데이터
  mainCategoryName: string; // 카테고리 이름
}

function LessonSummary({
  lessonOverviewData,
  mainCategoryName,
}: LessonSummaryProps) {
  const navigate = useNavigate();
  return (
    <div className="relative bg-white w-72  rounded-3xl shadow-lg transform hover:scale-105 transition-all duration-300">
      {/* <!-- 상단 라벨 --> */}
      <div className="absolute z-[1] -top-12 left-1/2  transform -translate-x-1/2 bg-white text-center pb-12 pt-1 px-4 rounded-full border">
        <p className="text-md font-bold text-[#3E3E3E]">{mainCategoryName}</p>
        <p className="text-sm font-bold text-[#3E3E3E]">
          {lessonOverviewData.teacherPreview.teacherName}
        </p>
      </div>
      {/* <!-- 본문 --> */}
      <div className="relative z-[4] flex items-center justify-center h-full bg-white rounded-3xl py-2 pb-10">
        <div className=" flex flex-col justify-start items-center  mx-4 w-66  rounded-3xl my-1">
          <h2 className="text-lg font-semibold text-gray-800 bg-[#F6F6F6] text-center p-2 rounded-xl">
            {lessonOverviewData.courseName}
          </h2>

          <button
            type="button"
            className="absolute bottom-1 w-[120px] bg-[#FFB74D] text-white font-extrabold py-1.5 px-3 rounded-lg shadow-md hover:shadow-lg hover:bg-[#FFA726] transition duration-300"
            onClick={() => {
              navigate(
                `/preview-class?teacherName=${lessonOverviewData.teacherPreview.teacherName}&onlineCourseId=${lessonOverviewData.courseId}`,
              );
            }}
          >
            강좌 무료 체험
          </button>
        </div>
      </div>
    </div>
  );
}

export default LessonSummary;
