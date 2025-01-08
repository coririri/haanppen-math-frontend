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
    height: '160px',
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

interface DeleteCheckModalProps {
  deleteCheckModalOpen: boolean;
  setDeleteCheckModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: (e: unknown) => Promise<void>;
}

function DeleteCheckModal({
  deleteCheckModalOpen,
  setDeleteCheckModalOpen,
  handleDelete,
}: DeleteCheckModalProps) {
  return (
    <ReactModal
      isOpen={deleteCheckModalOpen}
      onRequestClose={() => setDeleteCheckModalOpen(false)}
      style={customModalStyles}
    >
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-xl font-bold mb-4">삭제 확인</h2>
        <p className="mb-2 text-center">정말로 삭제하시겠습니까?</p>
        <div className="flex justify-center w-full">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={() => setDeleteCheckModalOpen(false)}
            type="button"
          >
            취소
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded ml-2"
            onClick={handleDelete}
            type="button"
          >
            삭제
          </button>
        </div>
      </div>
    </ReactModal>
  );
}

export default DeleteCheckModal;
