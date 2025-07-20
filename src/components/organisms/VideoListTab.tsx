import React, { useState } from 'react';
import { AiOutlineVideoCameraAdd, AiFillEdit } from 'react-icons/ai';
import VideoItem from '../molecules/VideoItem';
import { VideoType } from '../../types/videoType';
import IconButton from '../atoms/IconButton';
import DeleteCheckModal from '../modals/DeleteCheckModal';
import { deleteLessonVideo, getLessonByDateAndCourse } from '../../apis/lesson';
import dateTimeToDate, {
  dateTimeToDateAndZeroTimes,
} from '../../utils/dateTimeToDate';

interface VideoListTabProps {
  videoData: VideoType[];
  setVideoData: React.Dispatch<React.SetStateAction<VideoType[]>>;
  memoId: number;
  startDate: Date;
  selectedClassindex: number;
  courseId: number;
  deleteCheckArr: boolean[];
  setDeleteCheckArr: React.Dispatch<React.SetStateAction<boolean[]>>;
}
function VideoListTab({
  videoData,
  setVideoData,
  memoId,
  startDate,
  selectedClassindex,
  courseId,
  deleteCheckArr,
  setDeleteCheckArr,
}: VideoListTabProps) {
  const [nowPlusVedio, setNowPlusVdeio] = useState(false);
  const [deleteVideoCheckModalOpen, setDeleteVideoCheckModalOpen] =
    useState(false);

  return (
    <div>
      <DeleteCheckModal
        deleteCheckModalOpen={deleteVideoCheckModalOpen}
        setDeleteCheckModalOpen={setDeleteVideoCheckModalOpen}
        handleDelete={async () => {
          try {
            for (let i = 0; i < deleteCheckArr.length; i += 1) {
              // eslint-disable-next-line no-continue
              if (!deleteCheckArr[i]) continue;
              await deleteLessonVideo(memoId, videoData[i].memoMediaId);

              const response = await getLessonByDateAndCourse(
                courseId,
                dateTimeToDate(
                  new Date(dateTimeToDateAndZeroTimes(new Date(startDate))),
                ),
              );
              if (response.status === 200) {
                const { data } = response;
                setVideoData(data.memoMediaViews);
              } else {
                setVideoData([]);
              }

              setDeleteCheckArr(
                Array(response.data.memoMediaViews.length).fill(false),
              );
            }
            setDeleteVideoCheckModalOpen(false);
          } catch (e) {
            console.log(e);
          }
        }}
      />
      <div className="flex flex-col items-center justify-center">
        <div className="flex justify-between items-center">
          <AiOutlineVideoCameraAdd size="2rem" className="mr-2" />
          <span className="font-bold text-3xl">수업 영상 관리</span>
        </div>
        <div className="flex justify-center my-2">
          <div className="mr-8">
            <IconButton
              bgColor="white"
              icon={<AiFillEdit size="20px" />}
              text="영상 추가"
              handleClick={() => {
                if (nowPlusVedio) {
                  alert('이미 영상을 추가 중에 있습니다.');
                  return;
                }
                setVideoData((prev) => {
                  const copiedVideoData = prev.map((video) => ({
                    ...video,
                    attachmentViews: [...video.attachmentViews],
                  }));
                  copiedVideoData.push({
                    memoMediaId: -1,
                    mediaName: '',
                    mediaSource: '',
                    title: '',
                    attachmentViews: [],
                    mediaSequence: 999,
                  });
                  return copiedVideoData;
                });
                setNowPlusVdeio(true);
              }}
            />
          </div>
          <div className="mr-8">
            <IconButton
              bgColor="white"
              icon={<AiFillEdit size="20px" />}
              text="영상 삭제"
              handleClick={() => {
                setDeleteVideoCheckModalOpen(true);
              }}
            />
          </div>
        </div>
        <div className="h-[500px] overflow-y-auto">
          <div className="flex items-center w-[700px] px-[30px] py-4 border-solid border-t-[5px] border-b-[2px] border-[#C9C9C9] bg-[#F6F6F6]">
            <input
              type="checkbox"
              className="w-[20px] h-[20px] align-middle mr-[30px]"
              checked={deleteCheckArr.every((checked) => checked)}
              onChange={() => {
                setDeleteCheckArr(
                  Array(deleteCheckArr.length).fill(
                    !deleteCheckArr.every((checked) => checked),
                  ),
                );
              }}
            />
            <span className="leading-[20px] font-bold w-[80px] text-center text-lg">
              순서
            </span>
            <span className="leading-[20px] font-bold w-[320px] text-center mx-auto text-lg">
              제목
            </span>
            <span className="leading-[20px] font-bold w-[100px] text-center mx-auto text-lg">
              수업자료
            </span>
          </div>
          {videoData
            .sort((a, b) => a.mediaSequence - b.mediaSequence)
            .map((video, vedioIndex) => (
              <VideoItem
                key={video.memoMediaId}
                videoData={videoData}
                video={video}
                setVideoData={setVideoData}
                vedioIndex={vedioIndex}
                lastVideoIndex={videoData.length}
                memoId={memoId}
                startDate={startDate}
                selectedClassindex={selectedClassindex}
                deleteCheckArr={deleteCheckArr}
                setDeleteCheckArr={setDeleteCheckArr}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default VideoListTab;
