import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <div className="w-[428px] h-[61px] lg:w-[660px] lg:h-[110px] mx-auto flex justify-between items-center">
      <Link
        to={`${localStorage.getItem('role') === 'STUDENT' ? '/my-class' : '/enroll-class-video'}`}
        className="w-[120px] text-2xl lg:w-[150px] lg:text-3xl text-center text-hpDarkBlue font-sjBold"
      >
        {localStorage.getItem('role') === 'STUDENT' ? '내 강의실' : '강의 등록'}
      </Link>
      <Link
        to="/question"
        className="w-[120px] text-2xl lg:w-[150px] lg:text-3xl text-center font-bold"
      >
        질문 게시판
      </Link>
      <Link
        to={`${localStorage.getItem('role') === 'STUDENT' ? '/concept-video' : '/management'}`}
        className="w-[120px] text-2xl lg:w-[150px] lg:text-3xl text-center font-bold"
      >
        {localStorage.getItem('role') === 'STUDENT' ? '개념 영상' : '관리'}
      </Link>
    </div>
  );
}

export default Navigation;
