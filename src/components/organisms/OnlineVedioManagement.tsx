import React, { useState } from 'react';
import { AiFillEdit, AiOutlineVideoCameraAdd } from 'react-icons/ai';
import IconButton from '../atoms/IconButton';
import VideoCard from '../molecules/VideoCard';
import DeleteCheckModal from '../modals/DeleteCheckModal';
import {
  deleteOnlineCourseVedio,
  getOnlineLesson,
} from '../../apis/onlineLesson';
import { OnlineVideoDataType } from '../../types/onlineVideoType';

interface OnlineVedioManagementProps {
  videoList: OnlineVideoDataType[];
  setVideoList: React.Dispatch<React.SetStateAction<OnlineVideoDataType[]>>;
  onlineCourseId: number;
  classIndex: number;
  deleteCheckArr: boolean[];
  setDeleteCheckArr: React.Dispatch<React.SetStateAction<boolean[]>>;
}

function OnlineVedioManagement({
  videoList,
  setVideoList,
  onlineCourseId,
  classIndex,
  deleteCheckArr,
  setDeleteCheckArr,
}: OnlineVedioManagementProps) {
  const [deleteVideoCheckModalOpen, setDeleteVideoCheckModalOpen] =
    useState(false);
  return (
    <div className="flex flex-col items-center justify-center my-6">
      <DeleteCheckModal
        deleteCheckModalOpen={deleteVideoCheckModalOpen}
        setDeleteCheckModalOpen={setDeleteVideoCheckModalOpen}
        handleDelete={async () => {
          try {
            for (let i = 0; i < deleteCheckArr.length; i += 1) {
              // eslint-disable-next-line no-continue
              if (!deleteCheckArr[i]) continue;
              await deleteOnlineCourseVedio(
                onlineCourseId,
                videoList[i].videoId,
              );

              const onlineLessonRespose = await getOnlineLesson(onlineCourseId);
              setVideoList(onlineLessonRespose.data.onlineVideoDetails);
              setDeleteCheckArr(
                Array(onlineLessonRespose.data.onlineVideoDetails.length).fill(
                  false,
                ),
              );
            }
            setDeleteVideoCheckModalOpen(false);
          } catch (e) {
            console.log(e);
          }
        }}
      />
      <div className="flex justify-between items-center">
        <AiOutlineVideoCameraAdd size="2rem" className="mr-2" />
        <h3 className="font-bold text-3xl">수업 영상 관리</h3>
      </div>
      <div className="flex justify-center my-2">
        <div className="mr-8">
          <IconButton
            bgColor="white"
            icon={<AiFillEdit size="20px" />}
            text="영상 추가"
            handleClick={() => {
              setVideoList((prev) => {
                const copiedVideoList = [...prev];
                copiedVideoList.push({
                  videoSequence: videoList.length + 1,
                  videoId: -1,
                  mediaName: '',
                  attachmentDetails: [],
                  isPreview: false,
                });
                return copiedVideoList;
              });
            }}
          />
        </div>
        <div>
          <IconButton
            bgColor="white"
            icon={<AiFillEdit size="20px" />}
            text="영상 삭제"
            handleClick={async () => {
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
          />
          <span className="leading-[20px] font-bold w-[60px] text-center text-lg">
            순서
          </span>
          <span className="leading-[20px] font-bold w-[280px] text-center mx-auto text-lg">
            제목
          </span>
          <span className="leading-[20px] font-bold w-[80px] text-center mx-auto text-lg">
            수업자료
          </span>
          <span className="leading-[20px] font-bold text-lg w-[80px] text-center">
            미리보기
          </span>
        </div>
        {videoList
          .sort((a, b) => a.videoSequence - b.videoSequence)
          .map((video, index) => (
            <VideoCard
              video={video}
              videoIndex={index}
              videoList={videoList}
              deleteCheckArr={deleteCheckArr}
              setDeleteCheckArr={setDeleteCheckArr}
              setVideoList={setVideoList}
              onlineCourseId={onlineCourseId}
              classIndex={classIndex}
            />
          ))}
      </div>
    </div>
  );
}

export default OnlineVedioManagement;
