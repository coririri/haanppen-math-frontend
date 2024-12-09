import React from 'react';

function LessonSummary() {
  return (
    <div className="relative bg-white w-72 h-48 rounded-3xl shadow-lg transform hover:scale-105 transition-all duration-300">
      {/* <!-- 상단 라벨 --> */}
      <div className="absolute z-[1] -top-12 left-1/2  transform -translate-x-1/2 bg-white text-center pb-12 pt-1 px-4 rounded-full border">
        <p className="text-md font-bold text-[#3E3E3E]">고등</p>
        <p className="text-sm font-bold text-[#3E3E3E]">하경현 선생님</p>
      </div>
      {/* <!-- 본문 --> */}
      <div className="relative z-[4] flex items-center justify-center h-full bg-white rounded-3xl pt-6 pb-10">
        <div className="bg-[#F6F6F6] flex flex-col justify-start items-center pt-1 mx-4 w-66 h-36 rounded-3xl">
          <h2 className="text-lg font-semibold text-gray-800 bg-[#F6F6F6]">
            강좌 설명
          </h2>
          <p className="w-66 h-18 px-4 overflow-hidden line-clamp-4 text-[#979494]">
            수학(상) 수업은 수학의 기초 개념을 다루며, 고등학교 수학 학습의
            토대를 마련하는 중요한 내용으로 구성되어 있습니다. 먼저, 집합과 명제
            부분에서는 집합의 개념과 표현 방법, 그리고 집합의 연산을 배우며,
            명제와 논리 연산을 이해합니다. 이를 통해 조건명제와
          </p>
          <button
            type="button"
            className="absolute bottom-1 w-[120px] bg-[#FFB74D] text-white font-extrabold py-1.5 px-3 rounded-lg shadow-md hover:shadow-lg hover:bg-[#FFA726] transition duration-300"
          >
            강좌 무료 체험
          </button>
        </div>
      </div>
    </div>
  );
}

export default LessonSummary;
