import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiFillEdit,
} from 'react-icons/ai';
import TextButton from '../atoms/TextButton';
import IconButton from '../atoms/IconButton';

function VideoItem({
  videoData,
  video,
  setVideoData,
  vedioIndex,
  lastVideoIndex,
}) {
  const [isVideoSelected] = useState(video.title !== '');
  const navigate = useNavigate();

  const upToOrder = () => {
    if (vedioIndex === 0) return;

    setVideoData((prev) => {
      const copiedVideoData = prev.map((tempVideo) => ({
        ...tempVideo,
        attachments: [...tempVideo.attachments],
      }));

      const tempVideo = {
        ...copiedVideoData[vedioIndex],
        attachments: copiedVideoData[vedioIndex].attachments,
      };
      copiedVideoData[vedioIndex] = copiedVideoData[vedioIndex - 1];
      copiedVideoData[vedioIndex - 1] = tempVideo;

      return copiedVideoData;
    });
  };

  const downToOrder = () => {
    if (vedioIndex === lastVideoIndex - 1) return;
    if (videoData[lastVideoIndex - 1].title === '') return;
    setVideoData((prev) => {
      const copiedVideoData = prev.map((tempVideo) => ({
        ...tempVideo,
        attachments: [...tempVideo.attachments],
      }));

      const tempVideo = {
        ...copiedVideoData[vedioIndex],
        attachments: copiedVideoData[vedioIndex].attachments,
      };
      copiedVideoData[vedioIndex] = copiedVideoData[vedioIndex + 1];
      copiedVideoData[vedioIndex + 1] = tempVideo;

      return copiedVideoData;
    });
  };

  const deleteVideo = () => {
    setVideoData((prev) => {
      const copiedVideoData = prev.map((tempVideo) => ({
        ...tempVideo,
        attachments: [...tempVideo.attachments],
      }));
      copiedVideoData.splice(vedioIndex, 1);
      return copiedVideoData;
    });
  };

  const uploadAttachmentFile = (e, attachmentIndex) => {
    const file = e.target.files[0];
    console.log(attachmentIndex);
    setVideoData((prev) => {
      const copiedVideoData = prev.map((tempVideo) => ({
        ...tempVideo,
        attachments: [...tempVideo.attachments],
      }));
      copiedVideoData[vedioIndex].attachments[attachmentIndex] = file.name;
      return copiedVideoData;
    });
  };

  const addAttachment = () => {
    setVideoData((prev) => {
      const copiedVideoData = prev.map((tempVideo) => ({
        ...tempVideo,
        attachments: [...tempVideo.attachments],
      }));
      copiedVideoData[vedioIndex].attachments.push('');
      return copiedVideoData;
    });
  };

  const deleteAttachment = (e, attachmentIndex) => {
    console.log(attachmentIndex);
    setVideoData((prev) => {
      const copiedVideoData = prev.map((tempVideo) => ({
        ...tempVideo,
        attachments: [...tempVideo.attachments],
      }));
      copiedVideoData[vedioIndex].attachments.splice(attachmentIndex, 1);
      return copiedVideoData;
    });
  };
  console.log(video);
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="w-[750px] h-[80px] bg-hpBgGray rounded-3xl my-4 flex items-center">
          {isVideoSelected ? (
            <div className="w-[60px] flex flex-col justify-center items-center">
              <button
                type="button"
                aria-label="영상 목록 위로 올리기"
                onClick={upToOrder}
              >
                <AiOutlineArrowUp
                  size="1.4rem"
                  className="bg-white rounded-xl mb-1"
                />
              </button>
              <button
                type="button"
                aria-label="영상 목록 밑으로 내리기"
                onClick={downToOrder}
              >
                <AiOutlineArrowDown
                  size="1.4rem"
                  className="bg-white rounded-xl mt-1 "
                />
              </button>
            </div>
          ) : (
            <div className="w-[60px]" />
          )}
          <span className="font-bold text-2xl">{vedioIndex + 1}번 영상</span>
          <span className="flex items-center justify-center w-[530px] h-[40px] bg-white mx-auto rounded-xl border-solid border-[1.5px] border-black font-bold">
            {!isVideoSelected ? (
              <TextButton
                color="gray"
                moreStyle="w-[11rem]"
                handleClick={() => {
                  navigate(
                    `/vedio-management?vedioIndex=${vedioIndex}&breadscrum=${localStorage.getItem('userName')}`,
                  );
                }}
              >
                영상 관리
              </TextButton>
            ) : (
              video.title
            )}
          </span>
        </div>

        <div className="w-[167px]">
          {isVideoSelected && (
            <IconButton
              bgColor="white"
              icon={<AiFillEdit size="20px" />}
              text="영상 목록 삭제"
              handleClick={deleteVideo}
            />
          )}
          {isVideoSelected && (
            <IconButton
              bgColor="white"
              icon={<AiFillEdit size="20px" />}
              text="수업 자료 추가"
              handleClick={addAttachment}
            />
          )}
        </div>
      </div>

      {video.attachments.map((attachment, attachmentIndex) => {
        console.log(attachmentIndex);
        return (
          <div className="w-full flex mb-2" key={attachment}>
            <label
              htmlFor={`uploadedFile${vedioIndex}${attachmentIndex}`}
              aria-label="파일 수정"
            >
              <div className="w-[130px] mr-4 text-center border-hpGray border-[0.072rem] border-solid rounded-full bg-hpLightGray hover:bg-hpHoverLightGray">
                <span className="font-bold text-lg">파일 선택</span>
              </div>
            </label>
            <input
              id={`uploadedFile${vedioIndex}${attachmentIndex}`}
              className="hidden"
              type="file"
              accept=".zip,.tar"
              onChange={(e) => {
                uploadAttachmentFile(e, attachmentIndex);
              }}
            />
            <TextButton
              color="gray"
              moreStyle="w-[130px] mr-4"
              handleClick={(e) => {
                deleteAttachment(e, attachmentIndex);
              }}
            >
              삭제 하기
            </TextButton>
            <span className="border-solid border-[1.3px] rounded-xl border-black w-[450px] text-lg text-center font-bold">
              {attachment}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default VideoItem;
