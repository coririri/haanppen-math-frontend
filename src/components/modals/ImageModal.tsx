import React from 'react';
import ReactModal from 'react-modal';
import { AiFillCloseCircle } from 'react-icons/ai';

interface ImageModalProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  imageSrc: string;
}

function ImageModal({ modalOpen, setModalOpen, imageSrc }: ImageModalProps) {
  const customModalStyles: ReactModal.Styles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0)', // 배경을 투명하게 설정
      zIndex: '10',
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0', // 화면 전체를 덮도록 설정
      display: 'flex', // flexbox 사용
      justifyContent: 'center', // 수평 가운데 정렬
      alignItems: 'center', // 수직 가운데 정렬
      width: '100%',
      height: '100%',
    },
    content: {
      inset: '0px',
      width: '90%', // 화면의 90%만 차지하게 설정
      maxWidth: '500px', // 모바일에서는 최대 500px로 제한
      height: 'auto',
      maxHeight: '80vh', // 최대 높이 80%로 설정
      margin: '0 auto', // 가운데 배치
      position: 'relative',
      borderRadius: '10px',
      padding: '10px',
      boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
      backgroundColor: 'white',
      overflow: 'hidden', // 기본적으로 숨김
    },
  };

  return (
    <ReactModal
      isOpen={modalOpen}
      onRequestClose={() => setModalOpen(false)} // 외부 클릭 시 닫기
      style={customModalStyles}
      ariaHideApp={false} // 필요 시 설정
      shouldCloseOnOverlayClick // 배경 클릭 시 닫기
    >
      <div className="relative">
        <button
          className="absolute top-2 right-3"
          type="button"
          aria-label="닫기"
          onClick={() => setModalOpen(false)}
        >
          <AiFillCloseCircle size="32px" />
        </button>
        <div className="flex justify-center items-center h-full">
          <img
            src={imageSrc}
            alt="원본 이미지"
            className="w-full h-auto max-h-[70vh] object-contain" // 모달 크기에 맞게 이미지 조정
          />
        </div>
      </div>
    </ReactModal>
  );
}

export default ImageModal;
