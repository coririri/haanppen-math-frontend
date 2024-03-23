import { useState } from 'react';
import PropTypes from 'prop-types';
import { LuEye, LuEyeOff } from 'react-icons/lu';

function LoginForm({ setUserForm, errorMessage, handleLoginClick }) {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

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
    <form className="w-[30.25rem] h-[16rem] flex flex-col justify-between mx-auto">
      <input
        className="w-[30.25rem] mx-auto text-lg font-cantarell font-bold bg-white px-2 py-[0.8rem] focus:outline-none"
        type="text"
        placeholder="아이디(전화번호)"
        onChange={(e) => {
          handleChangeForm(e, 'id');
        }}
      />
      <div className="w-[30.25rem] relative">
        <input
          className="w-[30.25rem] mx-auto text-lg font-cantarell font-bold bg-white px-2 py-[0.8rem] focus:outline-none"
          type={passwordVisibility ? 'text' : 'password'}
          placeholder="비밀번호"
          autoComplete="true"
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
        {errorMessage !== '' && (
          <div className="w-[30.25rem] h-[2.5rem] absolute bottom-4 text-center leading-[2.5rem]">
            <span className="font-bold text-hpRed text-lg">{errorMessage}</span>
          </div>
        )}
      </div>
      <div
        className={`w-[30.25rem] h-[3.875rem] rounded-xl mx-auto ${errorMessage !== '' ? 'bg-hpGray ' : ' bg-hpBlue hover:bg-hpDarkBlue'}`}
      >
        <button
          className="w-[30.25rem] h-[3.875rem]"
          type="button"
          onClick={handleLoginClick}
          disabled={errorMessage !== ''}
        >
          <span className="text-md text-white font-bold">로그인</span>
        </button>
      </div>
    </form>
  );
}

LoginForm.propTypes = {
  setUserForm: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  handleLoginClick: PropTypes.func.isRequired,
};

export default LoginForm;
