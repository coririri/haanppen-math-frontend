import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import TextButton from '../atoms/TextButton';
import { putLessonVideos } from '../../apis/lesson';
import OfflineAttachmentManagementModal from '../modals/OfflineAttachmentManagementModal';
import { VideoType } from '../../types/videoType';

interface VideoItemProps {
  videoData: VideoType[];
  video: VideoType;
  setVideoData: React.Dispatch<React.SetStateAction<VideoType[]>>;
  vedioIndex: number;
  lastVideoIndex: number;
  memoId: number;
  startDate: Date;
  selectedClassindex: number;
  deleteCheckArr: boolean[];
  setDeleteCheckArr: React.Dispatch<React.SetStateAction<boolean[]>>;
}

function VideoItem({
  videoData,
  video,
  setVideoData,
  vedioIndex,
  lastVideoIndex,
  memoId,
  startDate,
  selectedClassindex,
  deleteCheckArr,
  setDeleteCheckArr,
}: VideoItemProps) {
  const navigate = useNavigate();
  const [isVideoSelected] = useState(video.title !== '');
  const [attachmentModalOpen, setAttachmentModalOpen] = useState(false);

  const upToOrder = async () => {
    if (vedioIndex === 0) return;

    try {
      const copiedVideoDataToServer = videoData.map((tempVideo) => ({
        ...tempVideo,
        attachmentViews: [...tempVideo.attachmentViews],
      }));

      const tempVideoToServer = {
        ...copiedVideoDataToServer[vedioIndex],
        attachmentViews: copiedVideoDataToServer[vedioIndex].attachmentViews,
      };
      copiedVideoDataToServer[vedioIndex].mediaSequence =
        copiedVideoDataToServer[vedioIndex - 1].mediaSequence;
      copiedVideoDataToServer[vedioIndex - 1].mediaSequence =
        tempVideoToServer.mediaSequence;

      await putLessonVideos(memoId, copiedVideoDataToServer);

      setVideoData((prev) => {
        const copiedVideoData = prev.map((tempVideo) => ({
          ...tempVideo,
          attachmentViews: [...tempVideo.attachmentViews],
        }));

        const tempVideo = {
          ...copiedVideoData[vedioIndex],
          attachmentViews: copiedVideoData[vedioIndex].attachmentViews,
        };
        copiedVideoData[vedioIndex].mediaSequence =
          copiedVideoData[vedioIndex - 1].mediaSequence;
        copiedVideoData[vedioIndex - 1].mediaSequence = tempVideo.mediaSequence;

        return copiedVideoData;
      });
    } catch (e) {
      console.log(e);
    }
  };

  const downToOrder = async () => {
    if (vedioIndex === lastVideoIndex - 1) return;
    if (videoData[lastVideoIndex - 1].title === '') return;

    try {
      const copiedVideoDataToServer = videoData.map((tempVideo) => ({
        ...tempVideo,
        attachmentViews: [...tempVideo.attachmentViews],
      }));

      const tempVideoToServer = {
        ...copiedVideoDataToServer[vedioIndex],
        attachmentViews: copiedVideoDataToServer[vedioIndex].attachmentViews,
      };
      copiedVideoDataToServer[vedioIndex].mediaSequence =
        copiedVideoDataToServer[vedioIndex + 1].mediaSequence;
      copiedVideoDataToServer[vedioIndex + 1].mediaSequence =
        tempVideoToServer.mediaSequence;

      await putLessonVideos(memoId, copiedVideoDataToServer);

      setVideoData((prev) => {
        const copiedVideoData = prev.map((tempVideo) => ({
          ...tempVideo,
          attachmentViews: [...tempVideo.attachmentViews],
        }));

        const tempVideo = {
          ...copiedVideoData[vedioIndex],
          attachmentViews: copiedVideoData[vedioIndex].attachmentViews,
        };
        copiedVideoData[vedioIndex].mediaSequence =
          copiedVideoData[vedioIndex + 1].mediaSequence;
        copiedVideoData[vedioIndex + 1].mediaSequence = tempVideo.mediaSequence;

        return copiedVideoData;
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex items-center w-[700px] px-[30px] py-4 border-solid  border-b-[2px] border-[#C9C9C9] ">
      <OfflineAttachmentManagementModal
        modalOpen={attachmentModalOpen}
        setModalOpen={setAttachmentModalOpen}
        video={video}
        setVideoData={setVideoData}
        vedioIndex={vedioIndex}
      />
      <input
        type="checkbox"
        className="w-[20px] h-[20px] align-middle mr-[30px]"
        checked={deleteCheckArr[vedioIndex]}
        onChange={() => {
          setDeleteCheckArr((prev) => {
            const copiedDeleteCheckArr = [...prev];
            copiedDeleteCheckArr[vedioIndex] =
              !copiedDeleteCheckArr[vedioIndex];
            return copiedDeleteCheckArr;
          });
        }}
      />

      <div className="flex items-center justify-center leading-[20px] font-bold w-[80px] text-center text-lg">
        {vedioIndex + 1}
        {isVideoSelected ? (
          <div className="ml-2">
            <button
              className="block"
              type="button"
              aria-label="영상 목록 위로 올리기"
              onClick={upToOrder}
            >
              <AiOutlineArrowUp
                size="1.4rem"
                className="bg-white rounded-xl "
              />
            </button>
            <button
              type="button"
              aria-label="영상 목록 밑으로 내리기"
              onClick={downToOrder}
            >
              <AiOutlineArrowDown
                size="1.4rem"
                className="bg-white rounded-xl  "
              />
            </button>
          </div>
        ) : (
          <div />
        )}
      </div>

      {!isVideoSelected ? (
        <TextButton
          color="gray"
          moreStyle="w-[11rem] w-[320px]"
          handleClick={() => {
            navigate(
              `/vedio-management?breadscrum=/&memoId=${memoId}&date=${startDate}&classIndex=${selectedClassindex}`,
            );
          }}
        >
          영상 선택
        </TextButton>
      ) : (
        <span className="leading-[20px] font-bold w-[320px] text-center mx-auto text-lg">
          {video.mediaName}
        </span>
      )}

      <div className="flex justify-between items-center mx-auto">
        <div className="w-[100px]">
          {isVideoSelected && (
            <TextButton
              color="gray"
              moreStyle="w-[100px]"
              handleClick={async () => {
                setAttachmentModalOpen(true);
              }}
            >
              관리
            </TextButton>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoItem;
