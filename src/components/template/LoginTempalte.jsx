import { LuEye, LuEyeOff } from 'react-icons/lu';
import { useState } from 'react';
import Input from '../atoms/Input';
import logoImages from '../../images/loginPage/logo_image.png';

function LoginTempalte() {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  return (
    <main className="w-full h-[1024px] pb-36 flex flex-col items-center justify-center bg-hpLightGray ">
      <div className="mb-24">
        <img
          className="mx-auto"
          src={logoImages}
          alt="한편의 수학 로고 이미지"
        />
      </div>
      <div className="w-[30.25rem] h-[15rem] flex flex-col justify-between mx-auto">
        <input
          className="w-[30.25rem] mx-auto text-lg font-cantarell font-bold bg-white px-2 py-[0.8rem] focus:outline-none"
          type="text"
          placeholder="아이디"
        />
        <div className="w-[30.25rem] relative">
          <input
            className="w-[30.25rem] mx-auto text-lg font-cantarell font-bold bg-white px-2 py-[0.8rem] focus:outline-none"
            type={passwordVisibility ? 'text' : 'password'}
            placeholder="비밀번호"
          />
          {passwordVisibility ? (
            <button
              className="absolute right-4 top-4"
              type="button"
              aria-label="비밀번호 보기"
              onClick={() => {
                setPasswordVisibility((prev) => !prev);
              }}
            >
              <LuEye size="1.5rem" color="#BCBCBC" />
            </button>
          ) : (
            <button
              className="absolute right-4 top-4"
              type="button"
              aria-label="비밀번호 보이지 않기"
              onClick={() => {
                setPasswordVisibility((prev) => !prev);
              }}
            >
              <LuEyeOff size="1.5rem" color="#BCBCBC" />
            </button>
          )}
        </div>
        <div className="w-[30.25rem] h-[2.5rem] flex items-center">
          <div className="w-[1.5rem] h-[1.5rem] ml-6">
            <Input type="checkbox" />
          </div>
          <span className="font-bold text-lg ml-4">로그인 상태 유지</span>
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
