import { AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai';
import ReactModal from 'react-modal';
import { useState } from 'react';
import TextButton from '../atoms/TextButton';

function AttachmentManagementModal({
  modalOpen,
  setModalOpen,
  attachmentViews,
  //   videoIndex,
}) {
  /* overlay는 모달 창 바깥 부분을 처리하는 부분이고,
content는 모달 창부분이라고 생각하면 쉬울 것이다 */
  const customModalStyles = {
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
      width: '350px',
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
  const [modificationAttachmentViews, setModificationAttachmentViews] =
    useState([...attachmentViews]);
  console.log(attachmentViews);
  return (
    <ReactModal
      isOpen={modalOpen}
      onRequestClose={setModalOpen}
      style={customModalStyles}
    >
      <div className="flex flex-col justify-between h-[350px]">
        {/* 모달 제목 */}
        <h2 className="text-xl font-bold text-center mb-4">수업자료 관리</h2>

        {/* 링크 리스트 */}
        <div className="flex flex-col space-y-3">
          {modificationAttachmentViews.map((link, index) => (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={link}
                placeholder={`자료 ${index + 1}`}
                className="flex-1 border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-300"
                onChange={(e) => {
                  setModificationAttachmentViews((prev) => {
                    const copiedModificationAttachmentViews = [...prev];
                    copiedModificationAttachmentViews[index] = e.target.value;
                    return copiedModificationAttachmentViews;
                  });
                }}
              />
              <button
                type="button"
                className="text-red-500"
                aria-label={`자료 ${index + 1} 삭제`}
                onClick={() => {
                  setModificationAttachmentViews((prev) => {
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
        <div className="flex justify-end mt-3">
          <button
            type="button"
            className="flex items-center text-blue-500"
            onClick={() => {
              setModificationAttachmentViews((prev) => {
                const copiedModificationAttachmentViews = [...prev];
                copiedModificationAttachmentViews.push('');
                return copiedModificationAttachmentViews;
              });
            }}
          >
            <AiOutlinePlusCircle size="20px" className="mr-1" />
            자료 추가
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="mt-6  mb-4">
            <TextButton
              color="gray"
              moreStyle="w-[5rem] mr-4"
              handleClick={async () => {
                // api 연결
                setModalOpen(false);
              }}
            >
              확인
            </TextButton>
            <TextButton
              color="gray"
              moreStyle="w-[5rem] ml-4"
              handleClick={() => {
                setModificationAttachmentViews([...attachmentViews]);
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
