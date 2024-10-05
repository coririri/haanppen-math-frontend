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
  const [twoLeftPosition, setTwoLeftPosition] = useState('left-[20px]');
  const [studentLeftPosition, setStudentLeftPosition] =
    useState('left-[6.5rem]');

  if (num === 2) {
    if (isStudent) {
      return (
        <div>
          <div className="flex items-center justify-center mx-auto">
            <TextButton
              color="white"
              moreStyle="w-[100px] mr-2"
              isClick={isClickArr[0]}
              handleClick={() => {
                setIsClickArr([true, false]);
                setStudentLeftPosition('left-[6.5rem]');
              }}
            >
              {firstText}
            </TextButton>

            <TextButton
              color="white"
              moreStyle="w-[100px] ml-2"
              isClick={isClickArr[1]}
              handleClick={() => {
                setIsClickArr([false, true]);
                setStudentLeftPosition('left-[13.7rem]');
              }}
            >
              {secondText}
            </TextButton>
          </div>
          <div
            className={`transition-[left] relative h-1 w-20 mt-1 bg-hpBlue ${studentLeftPosition}`}
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
              setIsClickArr([true, false]);
              setTwoLeftPosition('left-[20px]');
            }}
          >
            {firstText}
          </TextButton>

          <TextButton
            color="white"
            isClick={isClickArr[1]}
            moreStyle="w-[180px] mr-4"
            handleClick={() => {
              setIsClickArr([false, true]);
              setTwoLeftPosition('left-[220px]');
            }}
          >
            {secondText}
          </TextButton>
        </div>
        <div
          className={`transition-[left] relative h-1 w-36 mt-1 bg-hpBlue ${twoLeftPosition}`}
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
