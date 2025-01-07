import React from 'react';

interface QueryBadgeProps {
  isSolved: boolean;
  isStudent?: boolean;
}

function QueryBadge({ isSolved, isStudent = false }: QueryBadgeProps) {
  if (isStudent === true) {
    if (isSolved === true)
      return (
        <div className="w-[60px]  bg-hpLightRed rounded-lg text-center">
          <span className="text-white text-md leading-[10px]  font-bold">
            완료
          </span>
        </div>
      );
    return (
      <div className="w-[60px]  bg-hpDarkBlue rounded-lg text-center">
        <span className="text-white text-lg leading-[10px]  font-bold">
          진행
        </span>
      </div>
    );
  }
  if (isSolved === true)
    return (
      <div className="w-[80px] h-[26px] bg-hpLightRed rounded-lg text-center">
        <span className="text-white text-lg leading-7 font-bold">완료</span>
      </div>
    );
  return (
    <div className="w-[80px] h-[26px] bg-hpDarkBlue rounded-lg text-center">
      <span className="text-white text-lg leading-7 font-bold">진행</span>
    </div>
  );
}

export default QueryBadge;
