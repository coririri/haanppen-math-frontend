import React, { useState } from 'react';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import TextButton from '../atoms/TextButton';
import AttachmentManagementModal from '../modals/AttachmentManagementModal';

function VideoCard({
  video,
  videoIndex,
  deleteCheckArr,
  setDeleteCheckArr,
  setVideoList,
}) {
  const [isOpenAttachmentModal, setIsOpenAttachmentModal] = useState(false);
  return (
    <div className="flex items-center w-[700px] px-[30px] py-4 border-solid  border-b-[2px] border-[#C9C9C9] ">
      <AttachmentManagementModal
        modalOpen={isOpenAttachmentModal}
        setModalOpen={setIsOpenAttachmentModal}
        attachmentViews={video.attachmentViews}
        setVideoList={setVideoList}
        videoIndex={videoIndex}
      />
      <input
        type="checkbox"
        className="w-[20px] h-[20px] align-middle mr-[30px]"
        checked={deleteCheckArr[videoIndex]}
        onChange={() => {
          setDeleteCheckArr((prev) => {
            const copiedDeleteCheckArr = [...prev];
            copiedDeleteCheckArr[videoIndex] =
              !copiedDeleteCheckArr[videoIndex];
            return copiedDeleteCheckArr;
          });
        }}
      />
      <div className="flex items-center justify-center leading-[20px] font-bold w-[60px] text-center text-lg">
        {videoIndex + 1}
        <div className="ml-2">
          <button type="button" aria-label="영상 목록 위로 올리기">
            <AiOutlineArrowUp size="1.4rem" className="bg-white rounded-xl " />
          </button>
          <button type="button" aria-label="영상 목록 밑으로 내리기">
            <AiOutlineArrowDown
              size="1.4rem"
              className="bg-white rounded-xl  "
            />
          </button>
        </div>
      </div>
      {video.title === '' ? (
        <span className="leading-[20px] font-bold w-[280px] text-center mx-auto text-lg">
          {video.title}
        </span>
      ) : (
        <span className="leading-[20px] font-bold w-[280px] text-center mx-auto text-lg">
          {video.title}
        </span>
      )}
      <span className="leading-[20px] font-bold w-[80px] text-center mx-auto text-lg">
        <TextButton
          color="gray"
          moreStyle="w-[5rem] mr-1"
          handleClick={async () => {
            setIsOpenAttachmentModal(true);
          }}
        >
          관리
        </TextButton>
      </span>
      <div className="w-[80px] flex justify-center">
        <input
          type="checkbox"
          className="w-[20px] h-[20px] align-middle"
          checked={video.alreadyView}
          onChange={() => {
            setVideoList((prev) => {
              const copiedVideoList = prev.map((copiedVideo) => ({
                title: copiedVideo.title,
                attachmentViews: [...copiedVideo.attachmentViews],
                alreadyView: copiedVideo.alreadyView,
              }));
              copiedVideoList[videoIndex].alreadyView =
                !copiedVideoList[videoIndex].alreadyView;
              return copiedVideoList;
            });
          }}
        />
      </div>
    </div>
  );
}

export default VideoCard;
