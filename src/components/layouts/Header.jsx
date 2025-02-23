import React from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const role = localStorage.getItem('role');
  const userName = localStorage.getItem('userName');
  const navigate = useNavigate();
  let roleTheme;
  if (role === 'ADMIN') {
    roleTheme = '관리자';
  } else if (role === 'TEACHER') {
    roleTheme = '선생님';
  } else if (role === 'STUDENT') {
    roleTheme = '학생';
  } else {
    roleTheme = '없음';
  }

  if (role === 'STUDENT') {
    return (
      <div>
        <header className="mx-auto w-full h-[96px] flex justify-between items-center">
          <button
            type="button"
            className="ml-4"
            onClick={() => {
              navigate('/');
              window.location.reload();
            }}
          >
            <img
              src="https://www.hpmath.co.kr/images/sm_logo_image.png"
              alt="한편의 수학 로고 이미지"
              className="w-[80px]"
            />
          </button>
          <span className="text-hpDarkBlue text-2xl font-sjBold">
            {roleTheme}
          </span>
          <Link to="/user-information" className="mr-4">
            <div className="flex items-center h-[46px] rounded-l-[40px] rounded-r-[40px] border-solid border-[#E0E0E0] border-[1.5px]">
              <div className="ml-2 mr-2 rounded-[15px] bg-hpGray flex items-center justify-center">
                <BsFillPersonFill color="#FFF" size="20px" />
              </div>
              <div className="mr-2 text-center whitespace-nowrap overflow-y-hidden overflow-x-auto">
                <span className="text-lg text-hpBlack">{userName}</span>
              </div>
            </div>
          </Link>
        </header>
        <hr className="w-full mx-auto bg-hpGray" />
      </div>
    );
  }
  return (
    <div className="mx-auto">
      <header className="mx-auto w-[1440px] h-[40px] py-6 flex justify-between items-center">
        <button
          type="button"
          className="block w-[200px]"
          onClick={() => {
            navigate('/');
            window.location.reload();
          }}
        >
          <img
            src="https://www.hpmath.co.kr/images/sm_logo_image.png"
            alt="한편의 수학 로고 이미지"
            className="w-[70px]"
          />
        </button>
        <span className="text-hpDarkBlue text-xl font-sjBold">{roleTheme}</span>
        <Link to="/user-information" className="block w-[200px] text-right">
          <div className="inline-block">
            <div className="flex items-center h-[30px] rounded-l-[40px] rounded-r-[40px] border-solid border-[#E0E0E0] border-[1.5px]">
              <div className="w-[22px] h-[22px] ml-2 mr-2 rounded-[15px] bg-hpGray flex items-center justify-center">
                <BsFillPersonFill color="#FFF" size="23px" />
              </div>
              <div className="h-[26px] mr-4 text-center whitespace-nowrap overflow-y-hidden overflow-x-auto">
                <span className="text-lg text-hpBlack">{userName}</span>
              </div>
            </div>
          </div>
        </Link>
      </header>
      <hr className="w-[1440px] h-[0.5px] mx-auto bg-hpGray" />
    </div>
  );
}

export default Header;
