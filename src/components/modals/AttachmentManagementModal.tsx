import { AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai';
import ReactModal from 'react-modal';
import { SetStateAction, useState } from 'react';
import TextButton from '../atoms/TextButton';
import {
  deleteOnlineCourseAttachment,
  getOnlineLesson,
  postOnlineCourseAttachment,
} from '../../apis/onlineLesson';
import {
  AttachmentDetailType,
  OnlineVideoDataType,
} from '../../types/onlineVideoType';

interface AttachmentManagementModalProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<SetStateAction<boolean>>;
  attachmentViews: AttachmentDetailType[];
  setVideoList: React.Dispatch<SetStateAction<OnlineVideoDataType[]>>;
  onlineCourseId: number;
  videoId: number;
}

function AttachmentManagementModal({
  modalOpen,
  setModalOpen,
  attachmentViews,
  setVideoList,
  onlineCourseId,
  videoId,
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
  const [additionAttachmentViews, setAdditionAttachmentViews] = useState<
    {
      title: string;
      url: string;
    }[]
  >([]);

  return (
    <ReactModal
      isOpen={modalOpen}
      onRequestClose={() => {
        setModalOpen(false);
      }}
      style={customModalStyles}
    >
      <div className="flex flex-col justify-between h-[350px]">
        <div>
          <div className="p-6 bg-white rounded-lg flex justify-center items-center mr-4">
            {/* 모달 제목 */}
            <h2 className="text-2xl font-extrabold text-center  text-gray-800">
              수업자료 관리
            </h2>

            {/* 버튼 */}
            <div className="flex justify-center ml-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
                onClick={() => {
                  window.open('https://zxing.org/w/decode.jspx', '_blank');
                }}
              >
                QR코드 링크로 변환
              </button>
            </div>
          </div>

          {/* 링크 리스트 */}
          <div className="flex flex-col space-y-3">
            {attachmentViews.map((link, index) => (
              <div
                className="flex items-center space-x-2"
                key={link.attachmentId}
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-300 hover:bg-blue-100 hover:text-blue-700 transition duration-200"
                >
                  {link.attachmentTitle}
                </a>
                <button
                  type="button"
                  className="text-red-500"
                  aria-label={`자료 ${index + 1} 삭제`}
                  onClick={async () => {
                    // 기존에 존재하던 첨부 링크 삭제 API
                    await deleteOnlineCourseAttachment(
                      onlineCourseId,
                      videoId,
                      link.attachmentId,
                    );

                    const onlineLessonRespose =
                      await getOnlineLesson(onlineCourseId);
                    setVideoList(onlineLessonRespose.data.onlineVideoDetails);
                  }}
                >
                  <AiOutlineDelete size="20px" />
                </button>
              </div>
            ))}
            {additionAttachmentViews.map((link, index) => (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={link.title}
                  placeholder={`자료 ${attachmentViews.length + index + 1} 이름`}
                  className="flex-1 border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-300"
                  onChange={(e) => {
                    setAdditionAttachmentViews((prev) => {
                      const copiedModificationAttachmentViews = [...prev];
                      copiedModificationAttachmentViews[index].title =
                        e.target.value;
                      return copiedModificationAttachmentViews;
                    });
                  }}
                />
                <input
                  type="text"
                  value={link.url}
                  placeholder={`자료 ${attachmentViews.length + index + 1}`}
                  className="flex-1 border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-300"
                  onChange={(e) => {
                    setAdditionAttachmentViews((prev) => {
                      const copiedModificationAttachmentViews = [...prev];
                      copiedModificationAttachmentViews[index].url =
                        e.target.value;
                      return copiedModificationAttachmentViews;
                    });
                  }}
                />
                <button
                  type="button"
                  className="text-red-500"
                  aria-label={`자료 ${index + 1} 삭제`}
                  onClick={() => {
                    setAdditionAttachmentViews((prev) => {
                      const copiedModificationAttachmentViews = [...prev];
                      copiedModificationAttachmentViews.splice(index, 1);
                      return copiedModificationAttachmentViews;
                    });
                  }}
                >
                  <AiOutlineDelete size="20px" />
                </button>
              </div>
            ))}
          </div>

          {/* + 버튼 */}
          <div className="flex justify-end mt-2">
            <button
              type="button"
              className="flex items-center text-blue-500"
              onClick={() => {
                setAdditionAttachmentViews((prev) => {
                  const copiedModificationAttachmentViews = [...prev];
                  copiedModificationAttachmentViews.push({
                    title: '',
                    url: '',
                  });
                  return copiedModificationAttachmentViews;
                });
              }}
            >
              <AiOutlinePlusCircle size="20px" className="mr-1" />
              자료 추가
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="mt-6  mb-4">
            <TextButton
              color="gray"
              moreStyle="w-[5rem] mr-4"
              handleClick={async () => {
                // api 연결
                for (let i = 0; i < additionAttachmentViews.length; i += 1) {
                  await postOnlineCourseAttachment(
                    onlineCourseId,
                    videoId,
                    additionAttachmentViews[i].title,
                    additionAttachmentViews[i].url,
                  );
                }

                const onlineLessonRespose =
                  await getOnlineLesson(onlineCourseId);
                setVideoList(onlineLessonRespose.data.onlineVideoDetails);
                setAdditionAttachmentViews([]);
                setModalOpen(false);
              }}
            >
              확인
            </TextButton>
            <TextButton
              color="gray"
              moreStyle="w-[5rem] ml-4"
              handleClick={() => {
                setAdditionAttachmentViews([]);
                setModalOpen(false);
              }}
            >
              취소
            </TextButton>
          </div>
        </div>
      </div>
    </ReactModal>
  );
}

export default AttachmentManagementModal;
