import { useState } from 'react';
import ReactModal from 'react-modal';
import { AiFillEdit } from 'react-icons/ai';
import DropdownMenu from '../molecules/DropdownMenu';
import TextButton from '../atoms/TextButton';
import IconButton from '../atoms/IconButton';

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
    width: '360px',
    height: '360px',
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

function StudentEnrollmentModal({
  enrollmentModalOpen,
  setEnrollmentModalOpen,
}) {
  const [choosenGradeIndex, setChoosenGradeIndex] = useState([
    true,
    false,
    false,
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [textArr] = useState(['초1', '초2', '초3', '초4', '초5', '초6']);

  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <ReactModal
      isOpen={enrollmentModalOpen}
      onRequestClose={setEnrollmentModalOpen}
      style={customModalStyles}
    >
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-bold">학생 등록</h1>
        <div className="flex items-center mt-4">
          <div className="flex items-center justify-between w-[140px] mx-auto mr-4">
            <TextButton
              color="white"
              shape="square"
              size="small"
              isClick={choosenGradeIndex[0]}
              handleClick={() => {
                setChoosenGradeIndex([true, false, false]);
              }}
            >
              초
            </TextButton>
            <TextButton
              color="white"
              shape="square"
              size="small"
              isClick={choosenGradeIndex[1]}
              handleClick={() => {
                setChoosenGradeIndex([false, true, false]);
              }}
            >
              중
            </TextButton>
            <TextButton
              color="white"
              shape="square"
              size="small"
              isClick={choosenGradeIndex[2]}
              handleClick={() => {
                setChoosenGradeIndex([false, false, true]);
              }}
            >
              고
            </TextButton>
          </div>
          <div>
            <DropdownMenu
              size="small"
              textArr={textArr}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              isOpen={isOpen}
              handleClick={() => setIsOpen((prev) => !prev)}
            />
          </div>
        </div>
        <form>
          <div className="flex mt-10 justify-center items-center">
            <div className="font-bold text-lg mr-2 w-[120px]">학생 이름</div>
            <input
              type="text"
              className="w-[160px] h-[30px] border-solid border-black border-[1px] rounded-md"
            />
          </div>
          <div className="flex mt-4 items-center justify-center">
            <div className="font-bold text-lg mr-2 w-[120px]">
              학생 연락처(ID)
            </div>
            <input
              type="text"
              className="w-[160px] h-[30px] border-solid border-black border-[1px] rounded-md"
            />
          </div>
        </form>
        <div className="mt-12 flex">
          <div className="mr-4">
            <IconButton
              bgColor="white"
              icon={<AiFillEdit size="20px" />}
              text="완료"
              handleClick={() => {
                console.log('완료');
              }}
            />{' '}
          </div>
          <div>
            <IconButton
              bgColor="white"
              icon={<AiFillEdit size="20px" />}
              text="취소"
              handleClick={() => {
                console.log('취소');
              }}
            />
          </div>
        </div>
      </div>
    </ReactModal>
  );
}

export default StudentEnrollmentModal;
