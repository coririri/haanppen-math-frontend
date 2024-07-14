import React from 'react';
import ReactModal from 'react-modal';
import { AiFillCloseCircle } from 'react-icons/ai';

function ImageModal({ modalOpen, setModalOpen, imageSrc }) {
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
      width: '100%',
      height: '100%',
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
  return (
    <ReactModal
      isOpen={modalOpen}
      onRequestClose={setModalOpen}
      style={customModalStyles}
    >
      <div className="relative">
        <button
          className="absolute top-4 right-5"
          type="button"
          aria-label="댓글 이미지 삭제"
          onClick={() => {
            setModalOpen(false);
          }}
        >
          <div>
            <AiFillCloseCircle size="36px" />
          </div>
        </button>
        <img src={imageSrc} alt="원본 이미지" className="w-[100%]" />
      </div>
    </ReactModal>
  );
}

export default ImageModal;
