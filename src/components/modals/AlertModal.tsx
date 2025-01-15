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
    height: '150px',
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

interface AlertModalProps {
  alertModalOpen: boolean;
  setAlertModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
}

function AlertModal({
  alertModalOpen,
  setAlertModalOpen,
  message,
}: AlertModalProps) {
  return (
    <ReactModal
      isOpen={alertModalOpen}
      onRequestClose={() => setAlertModalOpen(false)}
      style={customModalStyles}
    >
      <div className="flex flex-col justify-center items-center">
        <p className="mb-4 text-center font-bold">{message}</p>
        <div className="flex justify-center w-full">
          <button
            className="bg-gray-800 border-slate-200 border-solid border-2 text-white px-4 py-2 rounded"
            onClick={() => {
              setAlertModalOpen(false);
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

export default AlertModal;
