import React from 'react';
import ReactModal from 'react-modal';

const customModalStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    width: 'auto',
    height: 'auto',
    zIndex: '10',
    position: 'fixed',
    top: '0',
    left: '0',
  },
  content: {
    width: '300px',
    height: '200px',
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
    padding: '20px',
  },
};

interface ErrorConfirmModalProps {
  errorModalOpen: boolean;
  setErrorModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  errorMessage: string;
}

function ErrorConfirmModal({
  errorModalOpen,
  setErrorModalOpen,
  errorMessage,
}: ErrorConfirmModalProps) {
  return (
    <ReactModal
      isOpen={errorModalOpen}
      onRequestClose={() => setErrorModalOpen(false)}
      style={customModalStyles}
    >
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-xl font-bold mb-4">경고</h2>
        <p className="mb-2 text-center">{errorMessage}</p>
        <div className="flex justify-center w-full">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded"
            onClick={() => {
              setErrorModalOpen(false);
            }}
            type="button"
          >
            확인
          </button>
        </div>
      </div>
    </ReactModal>
  );
}

export default ErrorConfirmModal;
