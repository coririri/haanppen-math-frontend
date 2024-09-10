import { useState } from 'react';
import TextButton from '../atoms/TextButton';

function SlideBar({
  num,
  firstText,
  secondText,
  thirdText,
  isClickArr,
  setIsClickArr,
  isStudent,
}) {
  const [leftPosition, setLeftPosition] = useState('left-[130px]');
  const [studentLeftPosition, setStudentLeftPosition] = useState('left-[4rem]');

  if (num === 2) {
    if (isStudent) {
      return (
        <div>
          <div className="flex items-center justify-center mx-auto">
            <TextButton
              color="white"
              isClick={isClickArr[0]}
              moreStyle="w-[270px] mr-2"
              handleClick={() => {
                setIsClickArr([true, false]);
                setStudentLeftPosition('left-[4rem]');
              }}
            >
              {firstText}
            </TextButton>

            <TextButton
              color="white"
              shape="long"
              isClick={isClickArr[1]}
              handleClick={() => {
                setIsClickArr([false, true]);
                setStudentLeftPosition('left-[13.3rem]');
              }}
              moreStyle="ml-2"
              isStudent
            >
              {secondText}
            </TextButton>
          </div>
          <div
            className={`transition-[left] relative h-1 w-32 mt-1 bg-hpBlue ${studentLeftPosition}`}
          />
        </div>
      );
    }
    return (
      <div>
        <div>
          <TextButton
            color="white"
            isClick={isClickArr[0]}
            moreStyle="w-[180px] mr-4"
            handleClick={() => {
              setIsClickArr([false, true, false, false]);
              setLeftPosition('left-2');
            }}
          >
            {firstText}
          </TextButton>

          <TextButton
            color="white"
            isClick={isClickArr[1]}
            moreStyle="w-[180px] mr-4"
            handleClick={() => {
              setIsClickArr([false, false, true, false]);
              setLeftPosition('left-[16.5rem]');
            }}
          >
            {secondText}
          </TextButton>
        </div>
        <div
          className={`transition-[left] relative h-1 w-36 mt-1 bg-hpBlue ${leftPosition}`}
        />
      </div>
    );
  }
  if (num === 3) {
    return (
      <div className="w-[836px]">
        <div>
          <TextButton
            color="white"
            isClick={isClickArr[0]}
            moreStyle="w-[180px] mr-4"
            handleClick={() => {
              setIsClickArr([true, false, false]);
              setLeftPosition('left-[130px]');
            }}
          >
            {firstText}
          </TextButton>

          <TextButton
            color="white"
            isClick={isClickArr[1]}
            moreStyle="w-[180px] mr-4"
            handleClick={() => {
              setIsClickArr([false, true, false]);
              setLeftPosition('left-[330px]');
            }}
          >
            {secondText}
          </TextButton>

          <TextButton
            color="white"
            isClick={isClickArr[2]}
            moreStyle="w-[180px] mr-4"
            handleClick={() => {
              setIsClickArr([false, false, true]);
              setLeftPosition('left-[525px]');
            }}
          >
            {thirdText}
          </TextButton>
        </div>
        <div
          className={`transition-[left] relative h-1 w-40 mt-1 bg-hpBlue ${leftPosition}`}
        />
      </div>
    );
  }
}

export default SlideBar;
