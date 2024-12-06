import React, { useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import IconButton from '../atoms/IconButton';
import VideoCard from '../molecules/VideoCard';
import DeleteCheckModal from '../modals/DeleteCheckModal';

function OnlineVedioManagement() {
  const [videoList, setVideoList] = useState([
    {
      title: '수학(하) 로그와 실생활의 관계를 이용한 인수분해 정리 1강',
      attachmentViews: [],
      alreadyView: false,
    },
    {
      title: '수학(하) 로그와 실생활의 관계를 이용한 인수분해 정리 1강',
      attachmentViews: [],
      alreadyView: false,
    },
    {
      title: '수학(하) 로그와 실생활의 관계를 이용한 인수분해 정리 1강',
      attachmentViews: [],
      alreadyView: false,
    },
  ]);

  const [deleteCheckArr, setDeleteCheckArr] = useState(
    Array(videoList.length).fill(false),
  );
  const [deleteVideoCheckModalOpen, setDeleteVideoCheckModalOpen] =
    useState(false);
  return (
    <div className="flex flex-col items-center justify-center my-6">
      <DeleteCheckModal
        deleteCheckModalOpen={deleteVideoCheckModalOpen}
        setDeleteCheckModalOpen={setDeleteVideoCheckModalOpen}
        handleDelete={async () => {
          setDeleteVideoCheckModalOpen(false);
        }}
      />
      <h3 className="font-bold text-3xl">수업 영상 관리</h3>
      <div className="flex justify-center my-2">
        <div className="mr-8">
          <IconButton
            bgColor="white"
            icon={<AiFillEdit size="20px" />}
            text="영상 추가"
            handleClick={() => {}}
          />
        </div>
        <div>
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
        {videoList.map((video, index) => (
          <VideoCard
            video={video}
            videoIndex={index}
            deleteCheckArr={deleteCheckArr}
            setDeleteCheckArr={setDeleteCheckArr}
            setVideoList={setVideoList}
          />
        ))}
      </div>
    </div>
  );
}

export default OnlineVedioManagement;
