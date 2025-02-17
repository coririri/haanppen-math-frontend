import { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import ReactModal from 'react-modal';
import TextButton from '../atoms/TextButton';
import getDirectory, { createDirectory } from '../../apis/directory';
import { DirectoryType } from '../../types/directoryType';

interface CreateFolderModalProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  breadscrumArray: string[];
  setDirectoryDatas: React.Dispatch<React.SetStateAction<DirectoryType[]>>;
}

function CreateFolderModal({
  modalOpen,
  setModalOpen,
  breadscrumArray,
  setDirectoryDatas,
}: CreateFolderModalProps) {
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
      width: '350px',
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
    },
  };

  const [folderName, setFolderName] = useState('');

  return (
    <ReactModal
      isOpen={modalOpen}
      onRequestClose={() => {
        setModalOpen(false);
      }}
      style={customModalStyles}
    >
      <div className="relative">
        <div className="absolute right-1 top-1">
          <button
            type="button"
            aria-label="모달 창 닫기"
            onClick={() => {
              setModalOpen(false);
            }}
          >
            <AiFillCloseCircle size="24px" />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="font-bold text-sm mt-4">새 폴더 만들기</span>
          <input
            type="text"
            className="w-[250px] leading-[32px] mt-6 pl-2 border-solid border-hpLightBlue border-[1.2px] rounded-md"
            onChange={(e) => {
              setFolderName(e.target.value);
            }}
          />
          <div className="mt-6">
            <TextButton
              color="gray"
              moreStyle="w-[5rem] mr-1"
              handleClick={async () => {
                if (folderName.length === 0) {
                  alert('폴더 이름은 필수입니다.');
                  return;
                }
                try {
                  const absolutePath = breadscrumArray.join('/');
                  if (absolutePath !== '/') {
                    await createDirectory(absolutePath.slice(1), folderName);
                    const { data } = await getDirectory(absolutePath.slice(1));
                    setDirectoryDatas(data);
                  } else {
                    await createDirectory(absolutePath, folderName);
                    const { data } = await getDirectory(absolutePath);
                    setDirectoryDatas(data);
                  }

                  setModalOpen(false);
                  window.location.reload();
                } catch (e) {
                  console.log(e);
                }
              }}
            >
              확인
            </TextButton>
            <TextButton
              color="gray"
              moreStyle="w-[5rem] ml-1"
              handleClick={() => {
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

export default CreateFolderModal;
