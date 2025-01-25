import ReactModal from 'react-modal';
import { SetStateAction, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { AxiosError } from 'axios';
import { addAttachmentVideo, deleteAttachmentFile } from '../../apis/lesson';
import { AttachmentViewType, VideoType } from '../../types/videoType';
import VideoUploadingModal from './VideoUploadingModal';
import TextButton from '../atoms/TextButton';

interface AttachmentManagementModalProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<SetStateAction<boolean>>;
  video: VideoType;
  setVideoData: React.Dispatch<React.SetStateAction<VideoType[]>>;
  vedioIndex: number;
}

function OffAttachmentManagementModal({
  modalOpen,
  setModalOpen,
  video,
  setVideoData,
  vedioIndex,
}: AttachmentManagementModalProps) {
  /* overlay는 모달 창 바깥 부분을 처리하는 부분이고,
content는 모달 창부분이라고 생각하면 쉬울 것이다 */
  const customModalStyles: ReactModal.Styles = {
    overlay: {
      backgroundColor: ' rgba(0, 0, 0, 0.4)',
      width: '100%',
      height: '100vh',
      zIndex: '10',
      position: 'fixed',
      top: '0',
      left: '0',
    },
    content: {
      width: '550px',
      height: '400px',
      zIndex: '150',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '10px',
      boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
      backgroundColor: 'white',
      justifyContent: 'center',
      overflow: 'auto',
    },
  };

  const [uploadingInfo, setUploadingInfo] = useState({
    current: 0,
    end: 0,
  });

  const [isVideoUploadingModalOpen, setIsVideoUploadingModalOpen] =
    useState(false);

  const deleteAttachment = (attachmentIndex: number) => {
    setVideoData((prev) => {
      const copiedVideoData = prev.map((tempVideo) => ({
        ...tempVideo,
        attachmentViews: [...tempVideo.attachmentViews],
      }));
      copiedVideoData[vedioIndex].attachmentViews.splice(attachmentIndex, 1);
      return copiedVideoData;
    });
  };

  const uploadAttachmentFile = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files === null) return;
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

      formData.append('chunkedFile', chunk);

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
          setVideoData((prev) => {
            const copiedVideoData = prev.map((tempVideo) => ({
              ...tempVideo,
              attachmentViews: [...tempVideo.attachmentViews],
            }));
            copiedVideoData[vedioIndex].attachmentViews.push({
              fileName: file.name,
            });

            console.log(copiedVideoData);
            return copiedVideoData;
          });
        } else if (response.status === 202) {
          currentChunk += 1;
          setUploadingInfo((prev) => ({
            ...prev,
            current: currentChunk,
          }));
          sendNextChunk();
        }
      } catch (e: unknown) {
        if (
          e instanceof AxiosError &&
          e.response &&
          e.response.status === 406
        ) {
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
  };

  return (
    <ReactModal
      isOpen={modalOpen}
      onRequestClose={() => {
        setModalOpen(false);
      }}
      style={customModalStyles}
    >
      <VideoUploadingModal
        modalOpen={isVideoUploadingModalOpen}
        uploadingInfo={uploadingInfo}
      />
      <div className="h-[350px]">
        {/* 모달 제목 */}
        <div className="flex justify-center items-center border-b-[1.3px] border-solid border-gray-400/40 pb-2">
          <h2 className="text-2xl font-extrabold text-centertext-gray-800 mr-3">
            수업자료 관리
          </h2>

          <label htmlFor="uploadedFile" aria-label="파일 업로드">
            <div className="bg-white inline-flex items-center font-bold border-[1.5px] border-solid py-1 px-5 rounded-lg border-black">
              <AiFillEdit size="20px" />
              <span className="ml-2 text-md py-[0.15rem]  text-black">
                수업 자료 추가
              </span>
            </div>
          </label>
          <input
            id="uploadedFile"
            className="hidden"
            type="file"
            accept=".zip,.tar"
            onChange={(e) => {
              uploadAttachmentFile(e);
            }}
          />
        </div>
        <div>
          <div className="">
            {video.attachmentViews.map(
              (attachment: AttachmentViewType, attachmentIndex: number) => (
                <div
                  className="flex items-center justify-center border-b-[1.3px] border-solid border-gray-400/40 my-2 pb-2"
                  key={attachment.fileName}
                >
                  <span className="font-bold text-xl">
                    {attachmentIndex + 1}번
                  </span>
                  <span className="mx-4 border-solid border-[1.3px] h-[30px] rounded-xl border-black w-[300px] text-lg text-center font-bold">
                    {attachment.fileName}
                  </span>

                  <TextButton
                    color="gray"
                    moreStyle="w-[130px]"
                    handleClick={async () => {
                      if (attachment.attachmentId !== undefined)
                        await deleteAttachmentFile(attachment.attachmentId);
                      deleteAttachment(attachmentIndex);
                    }}
                  >
                    삭제 하기
                  </TextButton>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </ReactModal>
  );
}

export default OffAttachmentManagementModal;
