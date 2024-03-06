import { LuEye, LuEyeOff } from 'react-icons/lu';
import { useEffect, useState } from 'react';
import Input from '../atoms/Input';
import logoImages from '../../images/loginPage/logo_image.png';

function LoginTempalte() {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [userForm, setUserForm] = useState({ id: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const idRegex = /^010[0-9]{8}$/;
    const idTest = idRegex.test(userForm.id);
    const { id } = userForm;
    if (id === '') {
      setErrorMessage('');
    } else if (!idTest) {
      setErrorMessage(
        '아이디는 010으로 시작하는 11자리 숫자로 이루어져야 합니다',
      );
    } else {
      setErrorMessage('');
    }
  }, [userForm.id]);

  useEffect(() => {
    const { password } = userForm;
    const num = password.search(/[0-9]/g);
    const eng = password.search(/[a-zA-Z]/gi);
    const spe = password.search(/[!@6]/gi);

    if (password === '') setErrorMessage('');
    else if (password === '0000') {
      setErrorMessage('');
    } else if (password.length < 7 || password.length > 20) {
      setErrorMessage('8자리 ~ 20자리 이내로 입력해주세요.');
    } else if (password.search(/\s/) !== -1) {
      setErrorMessage('비밀번호는 공백 없이 입력해주세요.');
    } else if (num < 0 || eng < 0 || spe < 0) {
      setErrorMessage('비밀번호는 특수문자, 영어, 숫자를 포함해야합니다');
    } else {
      setErrorMessage('');
    }
  }, [userForm.password]);

  const handleChangeForm = (e, type) => {
    if (type === 'password')
      setUserForm((prev) => ({
        ...prev,
        password: e.target.value,
      }));
    else if (type === 'id')
      setUserForm((prev) => ({
        ...prev,
        id: e.target.value,
      }));
  };

  const handleClickPasswordVisibility = () => {
    setPasswordVisibility((prev) => !prev);
  };
  return (
    <main className="w-full h-[1024px] pb-36 flex flex-col items-center justify-center bg-hpLightGray ">
      <div className="mb-24">
        <img
          className="mx-auto"
          src={logoImages}
          alt="한편의 수학 로고 이미지"
        />
      </div>
      <div className="w-[30.25rem] h-[16rem] flex flex-col justify-between mx-auto">
        <input
          className="w-[30.25rem] mx-auto text-lg font-cantarell font-bold bg-white px-2 py-[0.8rem] focus:outline-none"
          type="text"
          placeholder="아이디"
          onChange={(e) => {
            handleChangeForm(e, 'id');
          }}
        />
        <div className="w-[30.25rem] relative">
          <input
            className="w-[30.25rem] mx-auto text-lg font-cantarell font-bold bg-white px-2 py-[0.8rem] focus:outline-none"
            type={passwordVisibility ? 'text' : 'password'}
            placeholder="비밀번호"
            onChange={(e) => {
              handleChangeForm(e, 'password');
            }}
          />
          {passwordVisibility ? (
            <button
              className="absolute right-4 top-4"
              type="button"
              aria-label="비밀번호 보기"
              onClick={handleClickPasswordVisibility}
            >
              <LuEye size="1.5rem" color="#BCBCBC" />
            </button>
          ) : (
            <button
              className="absolute right-4 top-4"
              type="button"
              aria-label="비밀번호 보이지 않기"
              onClick={handleClickPasswordVisibility}
            >
              <LuEyeOff size="1.5rem" color="#BCBCBC" />
            </button>
          )}
        </div>
        <div className="w-[30.25rem] h-[5rem] pb-6 relative flex items-center">
          <div className="w-[1.5rem] h-[1.5rem] ml-6">
            <Input type="checkbox" />
          </div>
          <span className="font-bold text-lg ml-4">로그인 상태 유지</span>
          {errorMessage !== '' && (
            <div className="w-[30.25rem] h-[2.5rem] absolute bottom-0 text-center leading-[2.5rem]">
              <span className="font-bold text-hpRed text-md">
                {errorMessage}
              </span>
            </div>
          )}
        </div>
        <div className="w-[30.25rem] h-[3.875rem] rounded-xl mx-auto bg-hpBlue hover:bg-hpDarkBlue">
          <button className="w-[30.25rem] h-[3.875rem]" type="button">
            <span className="text-md text-white font-bold">로그인</span>
          </button>
        </div>
      </div>
    </main>
  );
}

export default LoginTempalte;
