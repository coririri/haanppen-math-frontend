import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { AiFillEdit } from 'react-icons/ai';
import IconButton from '../atoms/IconButton';
import phonenumberValidate from '../../validation/phonenumberValidation';
import { teacherAccountRegist } from '../../apis/teacher';

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
    height: '300px',
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

function TeacherEnrollmentModal({
  enrollmentModalOpen,
  setEnrollmentModalOpen,
}) {
  phonenumberValidate();

  const [isDisabled, setIsDisabled] = useState(true);
  const [userform, setUserform] = useState({ name: '', phoneNumber: '' });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (userform.phoneNumber === '') {
      setIsDisabled(true);
      setErrorMessage('전화번호는 빈칸일 수 없습니다');
    } else if (!phonenumberValidate(userform.phoneNumber)) {
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

  return (
    <ReactModal
      isOpen={enrollmentModalOpen}
      onRequestClose={setEnrollmentModalOpen}
      style={customModalStyles}
    >
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-bold">강사 등록</h1>
        <form>
          <div className="flex mt-10 justify-center items-center">
            <label
              className="font-bold text-lg mr-2 w-[120px]"
              htmlFor="teacherModalName"
            >
              강사 이름
            </label>
            <input
              type="text"
              className="w-[160px] h-[30px] border-solid border-black border-[1px] rounded-md pl-2 text-sm font-bold"
              id="teacherModalName"
              placeholder="이름을 입력해주세요."
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
              htmlFor="teacherModalPhonenumber"
            >
              강사 연락처(ID)
            </label>
            <input
              type="text"
              id="teacherModalPhonenumber"
              className="w-[160px] h-[30px] border-solid border-black border-[1px] rounded-md pl-2 text-sm font-bold"
              placeholder="숫자만 입력해주세요."
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
                const payload = {
                  name: userform.name,
                  phoneNumber: userform.phoneNumber,
                };
                teacherAccountRegist(setEnrollmentModalOpen, payload);
              }}
              disabled={isDisabled}
            />
          </div>
          <div>
            <IconButton
              bgColor="white"
              icon={<AiFillEdit size="20px" />}
              text="취소"
              handleClick={() => {
                setEnrollmentModalOpen(false);
              }}
            />
          </div>
        </div>
      </div>
    </ReactModal>
  );
}

export default TeacherEnrollmentModal;
