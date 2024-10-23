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

  if (num === 2) {
    if (isStudent) {
      return (
        <div>
          <div>
            {/* 첫 번째 버튼 */}
            <div>
              <TextButton
                color="white"
                moreStyle={`w-[120px] mb-2 mr-1 transition-transform transform hover:scale-105 duration-300 ${
                  isClickArr[0]
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-black'
                }`}
                isClick={isClickArr[0]}
                handleClick={() => {
                  setIsClickArr([true, false]);
                }}
                textMoreStyle="leading-[16px] text-md"
              >
                {firstText}
              </TextButton>
            </div>

            {/* 두 번째 버튼 */}
            <TextButton
              color="white"
              moreStyle={`w-[120px]  transition-transform transform hover:scale-105 duration-300 ${
                isClickArr[1]
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
              isClick={isClickArr[1]}
              handleClick={() => {
                setIsClickArr([false, true]);
              }}
              textMoreStyle="leading-[16px] text-md"
            >
              {secondText}
            </TextButton>
          </div>
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
