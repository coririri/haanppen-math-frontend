import React from 'react';

function NonFoundPageServerError() {
  return (
    <div className="w-full h-[1024px] flex flex-col justify-start items-center">
      <div className="w-[26rem] h-[26rem] mt-24 mb-6 bg-hpGray rounded-[13rem] flex justify-center items-center">
        <span className="text-white font-bold text-[10rem]">404</span>
      </div>
      <span className="text-hpLightkBlack text-[3rem] text-center font-bold">
        해당 리소스가 서버에 존재하지 않습니다.
      </span>
    </div>
  );
}

export default NonFoundPageServerError;
