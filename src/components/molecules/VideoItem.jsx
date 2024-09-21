import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiFillEdit,
} from 'react-icons/ai';
import TextButton from '../atoms/TextButton';
import IconButton from '../atoms/IconButton';
import { putLessonVideos, addAttachmentVideo } from '../../apis/lesson';
import VideoUploadingModal from '../modals/VideoUploadingModal';

function VideoItem({
  videoData,
  video,
  setVideoData,
  vedioIndex,
  lastVideoIndex,
  memoId,
  startDate,
  selectedClassindex,
}) {
  console.log(videoData);
  const navigate = useNavigate();
  const [isVideoSelected] = useState(video.title !== '');
  const [uploadingInfo, setUploadingInfo] = useState({
    current: 0,
    end: 0,
  });
  const [isVideoUploadingModalOpen, setIsVideoUploadingModalOpen] =
    useState(false);

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
      copiedVideoDataToServer[vedioIndex] =
        copiedVideoDataToServer[vedioIndex - 1];
      copiedVideoDataToServer[vedioIndex - 1] = tempVideoToServer;

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
        copiedVideoData[vedioIndex] = copiedVideoData[vedioIndex - 1];
        copiedVideoData[vedioIndex - 1] = tempVideo;

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
      copiedVideoDataToServer[vedioIndex] =
        copiedVideoDataToServer[vedioIndex + 1];
      copiedVideoDataToServer[vedioIndex + 1] = tempVideoToServer;

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
        copiedVideoData[vedioIndex] = copiedVideoData[vedioIndex + 1];
        copiedVideoData[vedioIndex + 1] = tempVideo;

        return copiedVideoData;
      });
    } catch (e) {
      console.log(e);
    }
  };

  const deleteVideo = async () => {
    try {
      const copiedVideoDataToServer = videoData.map((tempVideo) => ({
        ...tempVideo,
        attachmentViews: [...tempVideo.attachmentViews],
      }));
      copiedVideoDataToServer.splice(vedioIndex, 1);

      await putLessonVideos(memoId, copiedVideoDataToServer);

      setVideoData((prev) => {
        const copiedVideoData = prev.map((tempVideo) => ({
          ...tempVideo,
          attachmentViews: [...tempVideo.attachmentViews],
        }));
        copiedVideoData.splice(vedioIndex, 1);
        return copiedVideoData;
      });
    } catch (e) {
      console.log(e);
    }
  };

  const uploadAttachmentFile = async (event, attachmentIndex) => {
    try {
      const file = event.target.files[0];
      const chunkSize = 1024 * 1024; // 1MB
      // 시작

      // total size 계산
      const totalChunks = Math.ceil(file.size / chunkSize);
      let currentChunk = 0;
      setUploadingInfo({
        current: 0,
        end: totalChunks,
      });

      // 동영상 업로드 로딩창 열림
      setIsVideoUploadingModalOpen(true);

      // chunk file 전송
      const sendNextChunk = async () => {
        // chunk size 만큼 데이터 분할

        const start = currentChunk * chunkSize;
        const end = Math.min(start + chunkSize, file.size);

        const chunk = file.slice(start, end);

        // form data 형식으로 전송
        const formData = new FormData();

        formData.append('media', chunk);

        try {
          const response = await addAttachmentVideo(
            video.memoMediaId,
            file.name.split('.')[0],
            file.size,
            start === 0 ? 0 : start + 1,
            totalChunks - 1 === currentChunk,
            file.name.slice(-4),
            formData,
          );
          console.log(response);
          if (response.status === 201) {
            setIsVideoUploadingModalOpen(false);
            alert('파일 전송이 끝났습니다');
          } else if (response.status === 202) {
            currentChunk += 1;
            setUploadingInfo((prev) => ({
              ...prev,
              current: currentChunk,
            }));
            sendNextChunk();
          }
        } catch (e) {
          if (e.response && e.response.status === 406) {
            console.log('406 Not Acceptable 에러 발생:', e.response.data);
            // 서버로부터 chunkIndex를 받아옴
            const { nextChunkIndex } = e.response.data;
            console.log(nextChunkIndex);
            currentChunk = ((nextChunkIndex - 1) / 1024) * 1024;
            setUploadingInfo((prev) => ({
              ...prev,
              current: currentChunk,
            }));
            sendNextChunk();
          } else {
            console.log('알 수 없는 에러:', e);
            alert('파일 업로드에 실패 하였습니다.');
            setIsVideoUploadingModalOpen(false);
          }
        }
      };

      sendNextChunk();

      setVideoData((prev) => {
        const copiedVideoData = prev.map((tempVideo) => ({
          ...tempVideo,
          attachmentViews: [...tempVideo.attachmentViews],
        }));
        copiedVideoData[vedioIndex].attachmentViews[attachmentIndex] =
          file.name;
        return copiedVideoData;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addAttachment = () => {
    setVideoData((prev) => {
      const copiedVideoData = prev.map((tempVideo) => ({
        ...tempVideo,
        attachmentViews: [...tempVideo.attachmentViews],
      }));
      copiedVideoData[vedioIndex].attachmentViews.push('');
      return copiedVideoData;
    });
  };

  const deleteAttachment = (e, attachmentIndex) => {
    console.log(attachmentIndex);
    setVideoData((prev) => {
      const copiedVideoData = prev.map((tempVideo) => ({
        ...tempVideo,
        attachmentViews: [...tempVideo.attachmentViews],
      }));
      copiedVideoData[vedioIndex].attachmentViews.splice(attachmentIndex, 1);
      return copiedVideoData;
    });
  };
  console.log(video);
  return (
    <div className="mx-auto">
      <VideoUploadingModal
        modalOpen={isVideoUploadingModalOpen}
        setModalOpen={setIsVideoUploadingModalOpen}
        uploadingInfo={uploadingInfo}
      />

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
                    `/vedio-management?breadscrum=/&memoId=${memoId}&date=${startDate}&classIndex=${selectedClassindex}`,
                  );
                }}
              >
                영상 관리
              </TextButton>
            ) : (
              video.mediaName.slice(0, -4)
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

      {video.attachmentViews.map((attachment, attachmentIndex) => {
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
