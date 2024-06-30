import { useEffect, useState, useRef } from 'react';
import ReactModal from 'react-modal';
import { AiFillEdit } from 'react-icons/ai';
import DropdownMenu from '../molecules/DropdownMenu';
import TextButton from '../atoms/TextButton';
import IconButton from '../atoms/IconButton';
import phonenumberValidate from '../../validation/phonenumberValidation';
import { modifyStudent } from '../../apis/student';

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

function StudentModificationModal({
  modificationModalOpen,
  setModificationModalOpen,
  id,
  grade,
  name,
  phoneNumber,
}) {
  const isInitialMount = useRef(true);
  const [choosenGradeIndex, setChoosenGradeIndex] = useState(() => {
    if (grade <= 5) return [true, false, false];
    if (grade <= 8) return [false, true, false];
    return [false, false, true];
  });

  const [isOpen, setIsOpen] = useState(false);
  const [dropdownContentsText, setDropdownContentsText] = useState(() => {
    if (grade <= 5) return ['초1', '초2', '초3', '초4', '초5', '초6'];
    if (grade <= 8) return ['중1', '중2', '중3'];
    return ['고1', '고2', '고3'];
  });

  const [selectedIndex, setSelectedIndex] = useState(() => {
    if (grade <= 5) return grade;
    if (grade <= 8) return grade - 6;
    return grade - 9;
  });

  const [isDisabled, setIsDisabled] = useState(true);
  const [userform, setUserform] = useState({ name, phoneNumber });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isInitialMount.current === true) {
      isInitialMount.current = false;
    } else if (choosenGradeIndex[0] === true) {
      setDropdownContentsText(['초1', '초2', '초3', '초4', '초5', '초6']);
      setSelectedIndex(0);
    } else if (choosenGradeIndex[1] === true) {
      setDropdownContentsText(['중1', '중2', '중3']);
      setSelectedIndex(0);
    } else if (choosenGradeIndex[2] === true) {
      setDropdownContentsText(['고1', '고2', '고3']);
      setSelectedIndex(0);
    }
  }, [choosenGradeIndex]);

  useEffect(() => {
    setSelectedIndex(() => {
      if (grade <= 5) return grade;
      if (grade <= 8) return grade - 6;
      return grade - 9;
    });

    setDropdownContentsText(() => {
      if (grade <= 5) return ['초1', '초2', '초3', '초4', '초5', '초6'];
      if (grade <= 8) return ['중1', '중2', '중3'];
      return ['고1', '고2', '고3'];
    });

    setChoosenGradeIndex(() => {
      if (grade <= 5) return [true, false, false];
      if (grade <= 8) return [false, true, false];
      return [false, false, true];
    });
    isInitialMount.current = true;
  }, [modificationModalOpen]);

  useEffect(() => {
    if (!phonenumberValidate(userform.phoneNumber)) {
      setIsDisabled(true);
      setErrorMessage('전화번호는 숫자만 입력할 수 있습니다');
    } else if (userform.name === '') {
      setIsDisabled(true);
      setErrorMessage('이름은 빈칸일 수 없습니다');
    } else {
      setIsDisabled(false);
      setErrorMessage('');
    }
  }, [userform]);
  console.log(selectedIndex);
  return (
    <ReactModal
      isOpen={modificationModalOpen}
      onRequestClose={setModificationModalOpen}
      style={customModalStyles}
    >
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-bold">학생 수정</h1>
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
              textArr={dropdownContentsText}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              isOpen={isOpen}
              handleClick={() => setIsOpen((prev) => !prev)}
            />
          </div>
        </div>
        <form>
          <div className="flex mt-10 justify-center items-center">
            <label
              className="font-bold text-lg mr-2 w-[120px]"
              htmlFor="studentModalName"
            >
              학생 이름
            </label>
            <input
              type="text"
              id="studentModalName"
              className="w-[160px] h-[30px] border-solid border-black border-[1px] rounded-md pl-2 text-sm font-bold"
              placeholder="이름을 입력해주세요."
              defaultValue={name}
              onChange={(e) => {
                setUserform((prev) => ({
                  ...prev,
                  name: e.target.value,
                }));
              }}
            />
          </div>
          <div className="flex mt-4 items-center justify-center">
            <label
              className="font-bold text-lg mr-2 w-[120px]"
              htmlFor="studentModalPhonenumber"
            >
              학생 연락처(ID)
            </label>
            <input
              type="text"
              id="studentModalPhonenumber"
              className="w-[160px] h-[30px] border-solid border-black border-[1px] rounded-md pl-2 text-sm font-bold"
              placeholder="숫자만 입력해주세요."
              defaultValue={phoneNumber}
              onChange={(e) => {
                setUserform((prev) => ({
                  ...prev,
                  phoneNumber: e.target.value,
                }));
              }}
            />
          </div>
        </form>
        <div className="mt-6 font-bold text-red-500">{errorMessage}</div>
        <div className="mt-6 flex">
          <div className="mr-4">
            <IconButton
              bgColor="white"
              icon={
                <AiFillEdit
                  size="20px"
                  className={`${isDisabled ? 'text-hpGray' : 'text-black'}`}
                />
              }
              text="완료"
              handleClick={() => {
                let modificationGrade;
                if (choosenGradeIndex[0] === true) {
                  modificationGrade = selectedIndex;
                } else if (choosenGradeIndex[1] === true) {
                  modificationGrade = selectedIndex + 6;
                } else {
                  modificationGrade = selectedIndex + 9;
                }
                const payload = {
                  name: userform.name,
                  grade: modificationGrade,
                  phoneNumber: userform.phoneNumber,
                  id,
                };
                modifyStudent(setModificationModalOpen, payload);
              }}
              disabled={isDisabled}
            />{' '}
          </div>
          <div>
            <IconButton
              bgColor="white"
              icon={<AiFillEdit size="20px" />}
              text="취소"
              handleClick={() => {
                setModificationModalOpen(false);
              }}
            />
          </div>
        </div>
      </div>
    </ReactModal>
  );
}

export default StudentModificationModal;
