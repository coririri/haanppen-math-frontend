import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import phonenumberValidate from '../../utils/phonenumberValidation'; // 전화번호 유효성 검사 함수
import { getPasswordValidCode, validePasswordCode } from '../../apis/account';

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
    width: '330px',
    height: '350px',
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
    padding: '20px', // 내부 여백 추가
  },
};

interface FindPasswordModalProps {
  findPasswordModalOpen: boolean;
  setFindPasswordModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function FindPasswordModal({
  findPasswordModalOpen,
  setFindPasswordModalOpen,
}: FindPasswordModalProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [validCode, setValidCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [phoneNumbererrorMessage, setPhoneNumberErrorMessage] = useState('');
  const [isDisabledCheckedPassword, setIsDisabledCheckedPassword] =
    useState(false);

  useEffect(() => {
    if (!phonenumberValidate(phoneNumber)) {
      setIsDisabledCheckedPassword(true);
      setPhoneNumberErrorMessage('전화번호는 숫자만 입력할 수 있습니다');
    } else {
      setIsDisabledCheckedPassword(false);
      setPhoneNumberErrorMessage('');
    }
  }, [phoneNumber]);

  useEffect(() => {
    setPhoneNumber('');
    setValidCode('');
    setIsCodeSent(false);
    setErrorMessage('');
    setPhoneNumberErrorMessage('');
    setIsDisabledCheckedPassword(false);
  }, [findPasswordModalOpen]);

  const handleSendCode = async () => {
    // 전화번호 유효성 검사
    if (!phonenumberValidate(phoneNumber)) {
      setErrorMessage('유효한 전화번호를 입력하세요.');
      return;
    }

    try {
      await getPasswordValidCode(phoneNumber); // 인증 코드 전송
      setIsCodeSent(true);
      setErrorMessage('인증 코드가 전송되었습니다.');
    } catch (error) {
      setErrorMessage('존재하지 않는 사용자입니다.');
    }
  };

  const handleVerifyCode = async () => {
    try {
      const { data } = await validePasswordCode(phoneNumber, validCode); // 인증 코드 확인
      alert(`화면을 캡쳐하세요\n재설정 비밀번호: ${data.changedPassword}`); // 인증 성공 후 처리
      setFindPasswordModalOpen(false); // 모달 닫기
    } catch (error) {
      setErrorMessage('인증 코드가 잘못되었습니다. 다시 시도하세요.');
    }
  };

  return (
    <ReactModal
      isOpen={findPasswordModalOpen}
      onRequestClose={() => setFindPasswordModalOpen(false)}
      style={customModalStyles}
    >
      <div className="flex flex-col justify-center items-center mt-12">
        <h2 className="text-xl font-semibold">비밀번호 찾기</h2>
        <div className="flex flex-col items-center justify-center mb-2">
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
              className="w-[130px] h-[30px] border-solid border-black border-[1px] rounded-md pl-1 text-sm font-bold"
              placeholder="숫자만 입력해주세요."
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
              disabled={isCodeSent}
            />
          </div>
          <div className="mt-2 font-bold text-red-500">
            {phoneNumbererrorMessage}
          </div>
        </div>
        {isCodeSent && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="인증 코드 입력"
              value={validCode}
              onChange={(e) => {
                setValidCode(e.target.value);
              }}
              className="border border-gray-300 rounded w-full px-3 py-2"
              disabled={isDisabledCheckedPassword}
            />
          </div>
        )}
        <div className="flex justify-between mb-4">
          {isCodeSent ? (
            <button
              onClick={handleVerifyCode}
              className="bg-green-500 text-white rounded px-4 py-2"
              type="button"
            >
              인증 코드 확인
            </button>
          ) : (
            <button
              onClick={handleSendCode}
              className="bg-blue-500 text-white rounded px-4 py-2"
              type="button"
            >
              인증 코드 전송
            </button>
          )}
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
    </ReactModal>
  );
}

export default FindPasswordModal;
