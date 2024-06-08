import React from 'react';

function StudentItem({ grade, name, id }) {
  return (
    <div>
      <div className="flex items-center justify-between my-2">
        <input type="checkbox" className="w-[16px] h-[16px]" />
        <span className="text-lg font-bold text-black">{grade}</span>
        <span className="text-lg font-bold text-black">{name}</span>
        <span className="text-lg font-bold text-black">{id}</span>
        <span className="text-lg font-bold text-black">수정</span>
      </div>
      <hr className="h-[0.5px] border-0 bg-hpGray w-[800px] mx-auto mt-2" />
    </div>
  );
}

export default StudentItem;
