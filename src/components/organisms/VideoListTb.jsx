import React from 'react';
import {
  AiOutlineVideoCameraAdd,
  AiOutlineArrowDown,
  AiOutlineArrowUp,
} from 'react-icons/ai';
import TextButton from '../atoms/TextButton';

function VideoListTb() {
  return (
    <div>
      <div className="flex justify-center items-center mt-8">
        <AiOutlineVideoCameraAdd size="2rem" className="mr-2" />
        <span className="font-bold text-2xl">수업 영상 목록</span>
      </div>
      <div className="w-[750px] h-[80px] bg-hpBgGray rounded-3xl mt-4 flex items-center">
        <div>
          <AiOutlineArrowDown size="1.3rem" className="bg-white rounded-xl" />
          <AiOutlineArrowUp size="1.3rem" className="bg-white rounded-xl" />
        </div>
        <input type="checkbox" className="" />
        <span>1번 영상</span>
        <TextButton color="gray" shape="long" handleClick={() => {}}>
          영상 관리
        </TextButton>
      </div>
    </div>
  );
}

export default VideoListTb;
