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
  const [leftPosition, setLeftPosition] = useState('left-28');
  const [studentLeftPosition, setStudentLeftPosition] = useState('left-[4rem]');

  if (num === 2) {
    if (isStudent) {
      return (
        <div>
          <div className="flex items-center justify-center mx-auto">
            <TextButton
              color="white"
              shape="long"
              isClick={isClickArr[0]}
              handleClick={() => {
                setIsClickArr([true, false]);
                setStudentLeftPosition('left-[4rem]');
              }}
              moreStyle="mr-2"
              isStudent
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
            shape="long"
            isClick={isClickArr[1]}
            handleClick={() => {
              setIsClickArr([false, true, false, false]);
              setLeftPosition('left-2');
            }}
            moreStyle="mr-4"
          >
            {firstText}
          </TextButton>

          <TextButton
            color="white"
            shape="long"
            isClick={isClickArr[2]}
            handleClick={() => {
              setIsClickArr([false, false, true, false]);
              setLeftPosition('left-[18.5rem]');
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
            shape="long"
            isClick={isClickArr[0]}
            handleClick={() => {
              setIsClickArr([true, false, false]);
              setLeftPosition('left-[125px]');
            }}
            moreStyle="mr-4"
          >
            {firstText}
          </TextButton>

          <TextButton
            color="white"
            shape="long"
            isClick={isClickArr[1]}
            handleClick={() => {
              setIsClickArr([false, true, false]);
              setLeftPosition('left-[340px]');
            }}
            moreStyle="mr-4"
          >
            {secondText}
          </TextButton>

          <TextButton
            color="white"
            shape="long"
            isClick={isClickArr[2]}
            handleClick={() => {
              setIsClickArr([false, false, true]);
              setLeftPosition('left-[555px]');
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
