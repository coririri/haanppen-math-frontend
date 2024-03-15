import { LuEye, LuEyeOff } from 'react-icons/lu';
import { useEffect, useState } from 'react';
import instance from '../../apis/instance';
import logoImages from '../../images/loginPage/logo_image.png';

function LoginPage() {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [userForm, setUserForm] = useState({ id: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const idRegex = /^010[0-9]{8}$/;
    const idTest = idRegex.test(userForm.id);
    if (!idTest) {
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
    const spe = password.search(/[!@^]/gi);

    if (password === '0000') {
      setErrorMessage('');
    } else if (password === 'admin') {
      setErrorMessage('');
    } else if (password.length < 7 || password.length > 20) {
      setErrorMessage('비밀번호를 8자리 ~ 20자리 이내로 입력해주세요.');
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

  const handleLoginClick = () => {
    instance
      .post(
        '/api/login',
        {
          userPhoneNumber: userForm.id,
          password: userForm.password,
        },
        {
          withCredentials: true,
        },
      )
      .then((response) => {
        const token = response.data.accessToken;
        const { role } = response.data;
        instance.defaults.headers.common.Authorization = token;
        localStorage.setItem('role', role);
      })
      .catch((error) => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        console.log(backendUrl);
        if (error.response) {
          // 요청이 전송되었고, 서버는 2xx 외의 상태 코드로 응답했습니다.
          const errorStatus = Number(error.response.status);
          const { errorCode } = error.response.data;
          if (errorStatus >= 400 && errorStatus < 500) {
            // 클라이언트 요청 오류
            if (errorStatus === 404) {
              // 404 페이지로 이동
            } else if (errorCode === '-003') {
              setErrorMessage('비밀번호가 틀렸습니다');
            } else if (errorCode === '-006') {
              setErrorMessage('없는 아이디 입니다.');
            } else if (errorCode === '-101') {
              setErrorMessage('입력 형식이 잘못 됐습니다.');
            }
          } else if (errorStatus >= 500) {
            // 500 페이지로 이동
          }
        } else if (error.request) {
          // 요청이 전송되었지만, 응답이 수신되지 않았습니다.
          // 'error.request'는 브라우저에서 XMLHtpRequest 인스턴스이고,
          // 보통 cors문제 or 네트워크 오류
          // console을 통해 개발자만 확인
          console.log(error.request);
        } else {
          // 오류가 발생한 요청을 설정하는 동안 문제가 발생했습니다.
          // console을 통해 개발자만 확인
          console.log('Error', error.message);
        }
      });
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
              <span className="font-bold text-hpRed text-lg">
                {errorMessage}
              </span>
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
      </div>
    </main>
  );
}

export default LoginPage;
