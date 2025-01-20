import React, { useState } from 'react';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import { useNavigate, useSearchParams } from 'react-router-dom';
import TextButton from '../atoms/TextButton';
import AttachmentManagementModal from '../modals/AttachmentManagementModal';
import {
  getOnlineLesson,
  putOnlineCoursePreview,
  putOnlineVedioSequence,
} from '../../apis/onlineLesson';
import { OnlineVideoDataType } from '../../types/onlineVideoType';

interface VideoCardProps {
  video: OnlineVideoDataType;
  videoIndex: number;
  videoList: OnlineVideoDataType[];
  deleteCheckArr: boolean[];
  setDeleteCheckArr: React.Dispatch<React.SetStateAction<boolean[]>>;
  setVideoList: React.Dispatch<React.SetStateAction<OnlineVideoDataType[]>>;
  onlineCourseId: number;
  classIndex: number;
}

function VideoCard({
  video,
  videoIndex,
  videoList,
  deleteCheckArr,
  setDeleteCheckArr,
  setVideoList,
  onlineCourseId,
  classIndex,
}: VideoCardProps) {
  const [isOpenAttachmentModal, setIsOpenAttachmentModal] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  if (video.videoId === -1)
    return (
      <div className="flex items-center w-[700px] px-[30px] py-4 border-solid  border-b-[2px] border-[#C9C9C9] ">
        <AttachmentManagementModal
          modalOpen={isOpenAttachmentModal}
          setModalOpen={setIsOpenAttachmentModal}
          attachmentViews={video.attachmentDetails}
          setVideoList={setVideoList}
          onlineCourseId={onlineCourseId}
          videoId={video.videoId}
        />
        <span className="w-[20px] h-[20px] align-middle mr-[30px]" />
        <div className="flex items-center justify-center leading-[20px] font-bold w-[60px] text-center text-lg">
          {videoIndex + 1}
          <div className="ml-2">
            <button type="button" aria-label="영상 목록 위로 올리기" disabled>
              <AiOutlineArrowUp
                size="1.4rem"
                className="bg-white rounded-xl "
              />
            </button>
            <button type="button" aria-label="영상 목록 밑으로 내리기" disabled>
              <AiOutlineArrowDown
                size="1.4rem"
                className="bg-white rounded-xl  "
              />
            </button>
          </div>
        </div>
        <span className="font-bold w-[280px] text-center mx-auto text-lg">
          <TextButton
            color="gray"
            moreStyle="w-[280px]"
            handleClick={async () => {
              navigate(
                `/vedio-management?breadscrum=/&onlineCourseId=${onlineCourseId}&classIndex=${classIndex}&date=${searchParams.get('date')}`,
              );
            }}
          >
            영상 선택
          </TextButton>
        </span>
        <span className="leading-[20px] font-bold w-[80px] text-center mx-auto text-lg" />
        <div className="w-[80px] flex justify-center">
          <span className="w-[20px] h-[20px] align-middle" />
        </div>
      </div>
    );

  return (
    <div className="flex items-center w-[700px] px-[30px] py-4 border-solid  border-b-[2px] border-[#C9C9C9] ">
      <AttachmentManagementModal
        modalOpen={isOpenAttachmentModal}
        setModalOpen={setIsOpenAttachmentModal}
        attachmentViews={video.attachmentDetails}
        setVideoList={setVideoList}
        onlineCourseId={onlineCourseId}
        videoId={video.videoId}
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
          <button
            type="button"
            aria-label="영상 목록 위로 올리기"
            onClick={async () => {
              if (videoIndex === 0) {
                alert('비디오의 순서가 1번째 입니다.');
                return;
              }
              try {
                await putOnlineVedioSequence(
                  onlineCourseId,
                  video.videoId,
                  videoIndex,
                );
                const onlineLessonRespose =
                  await getOnlineLesson(onlineCourseId);
                setVideoList(onlineLessonRespose.data.onlineVideoDetails);
              } catch (e) {
                console.log(e);
              }
            }}
          >
            <AiOutlineArrowUp size="1.4rem" className="bg-white rounded-xl " />
          </button>
          <button
            type="button"
            aria-label="영상 목록 밑으로 내리기"
            onClick={async () => {
              if (videoIndex === videoList.length - 1) {
                alert('비디오의 순서가 마지막 입니다.');
                return;
              }
              try {
                await putOnlineVedioSequence(
                  onlineCourseId,
                  video.videoId,
                  videoIndex + 2,
                );
                const onlineLessonRespose =
                  await getOnlineLesson(onlineCourseId);
                setVideoList(onlineLessonRespose.data.onlineVideoDetails);
              } catch (e) {
                console.log(e);
              }
            }}
          >
            <AiOutlineArrowDown
              size="1.4rem"
              className="bg-white rounded-xl  "
            />
          </button>
        </div>
      </div>
      <span className="leading-[20px] font-bold w-[280px] text-center mx-auto text-lg">
        {video.mediaName}
      </span>
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
          checked={video.isPreview}
          onChange={async () => {
            try {
              await putOnlineCoursePreview(video.videoId, !video.isPreview);
              const onlineLessonRespose = await getOnlineLesson(onlineCourseId);
              setVideoList(onlineLessonRespose.data.onlineVideoDetails);
            } catch (e) {
              console.log(e);
            }
          }}
        />
      </div>
    </div>
  );
}

export default VideoCard;
