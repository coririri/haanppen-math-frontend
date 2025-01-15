import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { dateTimeToDateAndZeroTimes } from '../../utils/dateTimeToDate';

function Navigation() {
  const [, setClickIndex] = useState(1);
  const role = localStorage.getItem('role');

  console.log(new Date(dateTimeToDateAndZeroTimes(new Date())));
  if (role === 'STUDENT') {
    return (
      <nav className="w-full mx-auto">
        <div className="w-full h-[61px] mx-auto flex justify-center items-center">
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
              to="/lesson-overview"
              className="text-xl text-center hover:text-hpDarkBlue hover:font-sjBold  text-black font-bold"
            >
              개설 강좌
            </Link>
          </button>
          {/* <button
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
          </button> */}
        </div>
      </nav>
    );
  }
  if (role === 'ADMIN')
    return (
      <nav className="w-[1440px] mx-auto">
        <div className="h-[50px] mx-[300px] flex justify-between items-center">
          <Link
            to={`/enroll-class?date=${new Date(dateTimeToDateAndZeroTimes(new Date()))}&classIndex=${0}&classType=offline`}
            className=" block text-xl   hover:text-hpDarkBlue hover:font-sjBold  text-black font-bold"
          >
            <button
              type="button"
              className="text-right"
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
              className="block"
              onClick={() => {
                setClickIndex(2);
              }}
            >
              질문 게시판
            </button>
          </Link>

          <Link
            to="/management"
            className=" block  text-xl   hover:text-hpDarkBlue hover:font-sjBold  text-black font-bold"
          >
            <button
              type="button"
              className="block text-left"
              onClick={() => {
                setClickIndex(3);
              }}
            >
              관리
            </button>
          </Link>

          <Link
            to="/vedio-management?breadscrum=/&date=Wed%20Oct%2023%202024%2018:32:03%20GMT+0900%20(%ED%95%9C%EA%B5%AD%20%ED%91%9C%EC%A4%80%EC%8B%9C)"
            className="block  text-xl   hover:text-hpDarkBlue hover:font-sjBold  text-black font-bold"
          >
            <button
              type="button"
              className="block  text-left"
              onClick={() => {
                setClickIndex(3);
              }}
            >
              영상 관리
            </button>
          </Link>
        </div>
      </nav>
    );

  return (
    <nav className="w-[1440px] mx-auto">
      <div className="w-[660px] h-[50px] mx-auto flex justify-between items-center">
        <Link
          to={`/enroll-class?date=${new Date(dateTimeToDateAndZeroTimes(new Date()))}&classIndex=${0}&classType=offline`}
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
        <button
          type="button"
          className="block w-[120px]"
          onClick={() => {
            setClickIndex(3);
          }}
        >
          <Link
            to="/lesson-overview"
            className="text-xl text-center hover:text-hpDarkBlue hover:font-sjBold  text-black font-bold"
          >
            개설 강좌
          </Link>
        </button>

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
