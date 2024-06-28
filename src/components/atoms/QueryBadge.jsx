import React from 'react';

function QueryBadge({ isSolved }) {
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
