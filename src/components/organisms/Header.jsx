import React from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import logoImages from '../../images/header/sm_logo_image.png';

function Header() {
  const role = localStorage.getItem('role');
  const userName = localStorage.getItem('userName');
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
        <header className="mx-auto w-[428px] h-[96px] flex justify-between items-center">
          <button
            type="button"
            className="ml-4"
            onClick={() => {
              window.location.reload();
            }}
          >
            <img src={logoImages} alt="한편의 수학 로고 이미지" />
          </button>
          <span className="text-hpDarkBlue text-3xl font-sjBold">
            {roleTheme}
          </span>
          <Link to="/user-information" className="mr-4">
            <div className="flex items-center h-[46px] rounded-l-[40px] rounded-r-[40px] border-solid border-[#E0E0E0] border-[1.5px]">
              <div className="ml-2 mr-2 rounded-[15px] bg-hpGray flex items-center justify-center">
                <BsFillPersonFill color="#FFF" size="23px" />
              </div>
              <div className="mr-4 text-center whitespace-nowrap overflow-y-hidden overflow-x-auto">
                <span className="text-xl text-hpBlack">{userName}</span>
              </div>
            </div>
          </Link>
        </header>
        <hr className="w-[428px] mx-auto bg-hpGray" />
      </div>
    );
  }
  return (
    <div className="mx-auto">
      <header className="mx-auto w-[1440px] h-[80px] flex justify-between items-center">
        <button
          type="button"
          className="ml-64"
          onClick={() => {
            window.location.reload();
          }}
        >
          <img src={logoImages} alt="한편의 수학 로고 이미지" />
        </button>
        <span className="text-hpDarkBlue text-3xl font-sjBold">
          {roleTheme}
        </span>
        <Link to="/user-information" className="mr-[245px]">
          <div className="flex items-center h-[46px] rounded-l-[40px] rounded-r-[40px] border-solid border-[#E0E0E0] border-[1.5px]">
            <div className="w-[30px] h-[30px] ml-2 mr-2 rounded-[15px] bg-hpGray flex items-center justify-center">
              <BsFillPersonFill color="#FFF" size="23px" />
            </div>
            <div className="h-[30px] mr-4 text-center whitespace-nowrap overflow-y-hidden overflow-x-auto">
              <span className="text-2xl text-hpBlack">{userName}</span>
            </div>
          </div>
        </Link>
      </header>
      <hr className="w-[1440px] h-[0.5px] mx-auto bg-hpGray" />
    </div>
  );
}

export default Header;
