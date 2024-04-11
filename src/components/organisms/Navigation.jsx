import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  const [clickIndex, setClickIndex] = useState(1);

  return (
    <div className="w-[428px] h-[61px] lg:w-[660px] lg:h-[110px] mx-auto flex justify-between items-center">
      <button
        type="button"
        className="block w-[120px] lg:w-[150px]"
        onClick={() => {
          setClickIndex(1);
        }}
      >
        <Link
          to={`${localStorage.getItem('role') === 'STUDENT' ? '/my-class' : '/enroll-class-video'}`}
          className={`text-2xl  lg:text-3xl text-center   ${clickIndex === 1 ? 'text-hpDarkBlue font-sjBold' : 'text-black font-bold'}`}
        >
          {localStorage.getItem('role') === 'STUDENT'
            ? '내 강의실'
            : '강의 등록'}
        </Link>
      </button>
      <button
        type="button"
        className="block w-[120px] lg:w-[150px]"
        onClick={() => {
          setClickIndex(2);
        }}
      >
        <Link
          to="/question"
          className={`text-2xl lg:text-3xl text-center   ${clickIndex === 2 ? 'text-hpDarkBlue font-sjBold' : 'text-black font-bold'}`}
        >
          질문 게시판
        </Link>
      </button>
      <button
        type="button"
        className="block w-[120px] lg:w-[150px]"
        onClick={() => {
          setClickIndex(3);
        }}
      >
        <Link
          to={`${localStorage.getItem('role') === 'STUDENT' ? '/concept-video' : '/management'}`}
          className={`text-2xl  lg:text-3xl text-center   ${clickIndex === 3 ? 'text-hpDarkBlue font-sjBold' : 'text-black font-bold'}`}
        >
          {localStorage.getItem('role') === 'STUDENT' ? '개념 영상' : '관리'}
        </Link>
      </button>
    </div>
  );
}

export default Navigation;
