import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  const [, setClickIndex] = useState(1);
  const role = localStorage.getItem('role');

  if (role === 'STUDENT') {
    return (
      <nav className="w-[428px] mx-auto">
        <div className="w-[428px] h-[61px] mx-auto flex justify-between items-center">
          <button
            type="button"
            className="block w-[120px]"
            onClick={() => {
              setClickIndex(1);
            }}
          >
            <Link
              to="/my-class?classIndex=0&sortIndex=0"
              className="text-xl text-center hover:text-hpDarkBlue hover:font-sjBold  text-black font-bold"
            >
              내 강의실
            </Link>
          </button>
          <button
            type="button"
            className="block w-[120px]"
            onClick={() => {
              setClickIndex(2);
            }}
          >
            <Link
              to="/question-board"
              className="text-xl text-center hover:text-hpDarkBlue hover:font-sjBold  text-black font-bold"
            >
              질문 게시판
            </Link>
          </button>
          <button
            type="button"
            className="block w-[120px]"
            onClick={() => {
              setClickIndex(3);
            }}
          >
            <Link
              to="/concept-video"
              className="text-xl text-center hover:text-hpDarkBlue hover:font-sjBold  text-black font-bold"
            >
              개념 영상
            </Link>
          </button>
        </div>
      </nav>
    );
  }
  if (role === 'ADMIN')
    return (
      <nav className="w-[1440px] mx-auto">
        <div className="w-[660px] h-[50px] mx-auto flex justify-between items-center">
          <Link
            to={`/enroll-class?date=${new Date()}&classIndex=${0}`}
            className=" block  w-[160px] text-xl   hover:text-hpDarkBlue hover:font-sjBold  text-black font-bold"
          >
            <button
              type="button"
              className="text-right w-[160px]"
              onClick={() => {
                setClickIndex(1);
              }}
            >
              강의 등록
            </button>
          </Link>

          <Link
            to="/question-board"
            className="text-xl text-center  hover:text-hpDarkBlue hover:font-sjBold  text-black font-bold"
          >
            <button
              type="button"
              className="block w-[100px]"
              onClick={() => {
                setClickIndex(2);
              }}
            >
              질문 게시판
            </button>
          </Link>

          <Link
            to="/management"
            className=" block  w-[160px] text-xl   hover:text-hpDarkBlue hover:font-sjBold  text-black font-bold"
          >
            <button
              type="button"
              className="block w-[160px] text-left"
              onClick={() => {
                setClickIndex(3);
              }}
            >
              관리
            </button>
          </Link>
        </div>
      </nav>
    );

  return (
    <nav className="w-[1440px] mx-auto">
      <div className="w-[660px] h-[50px] mx-auto flex justify-between items-center">
        <Link
          to={`/enroll-class?date=${new Date()}&classIndex=${0}`}
          className=" block  w-[160px] text-xl   hover:text-hpDarkBlue hover:font-sjBold  text-black font-bold"
        >
          <button
            type="button"
            className="text-right w-[160px]"
            onClick={() => {
              setClickIndex(1);
            }}
          >
            강의 등록
          </button>
        </Link>

        <Link
          to="/question-board"
          className="text-xl text-center  hover:text-hpDarkBlue hover:font-sjBold  text-black font-bold"
        >
          <button
            type="button"
            className="block w-[100px]"
            onClick={() => {
              setClickIndex(2);
            }}
          >
            질문 게시판
          </button>
        </Link>

        <Link
          to="/management"
          className=" block  w-[160px] text-xl   hover:text-hpDarkBlue hover:font-sjBold  text-black font-bold"
        >
          <button
            type="button"
            className="block w-[160px] text-left"
            onClick={() => {
              setClickIndex(3);
            }}
          >
            관리
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;
