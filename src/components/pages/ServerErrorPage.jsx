import React from 'react';

function ServerErrorPage() {
  return (
    <div className="lg:w-[1440px] md:w-[834px] w-[428px] mx-auto h-[100vh] flex flex-col justify-start items-center">
      <div className="lg:w-[26rem] md:w-[20rem] w-[12rem] lg:h-[26rem] md:h-[20rem] h-[12rem] lg:rounded-[16rem] md:rounded-[13rem] rounded-[6rem] mt-24 mb-6 bg-hpGray flex justify-center items-center">
        <span className="text-white font-bold lg:text-[10rem] md:text-[8rem] text-[6rem]">
          500
        </span>
      </div>
      <span className="text-hpLightkBlack lg:text-[3rem] md:text-[2rem] text-[1.5rem] text-center font-bold">
        Internal Server Error
      </span>
    </div>
  );
}

export default ServerErrorPage;
