import React from 'react';

function ServerErrorPage() {
  return (
    <div className="w-full h-[1024px] flex flex-col justify-start items-center">
      <div className="w-[26rem] h-[26rem] mt-24 mb-6 bg-hpGray rounded-[13rem] flex justify-center items-center">
        <span className="text-white font-bold text-[10rem]">500</span>
      </div>
      <span className="text-hpLightkBlack text-[3rem] font-bold">
        Internal Server Error
      </span>
    </div>
  );
}

export default ServerErrorPage;
