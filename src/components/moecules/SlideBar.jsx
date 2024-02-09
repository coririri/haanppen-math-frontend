import { useState } from 'react';
import PropTypes from 'prop-types';
import TextButton from '../atoms/TextButton';

function SlideBar({
  num,
  firstText,
  secondText,
  thirdText,
  isClickArr,
  setIsClickArr,
}) {
  const [leftPosition, setLeftPosition] = useState('left-2');

  if (num === 2) {
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
              setLeftPosition('left-[17.5rem]');
            }}
          >
            {secondText}
          </TextButton>
        </div>
        <div
          className={`transition-[left] relative h-1 w-60 mt-1 bg-hpBlue ${leftPosition}`}
        />
      </div>
    );
  }
  if (num === 3) {
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
              setLeftPosition('left-[16.8rem]');
            }}
            moreStyle="mr-4"
          >
            {secondText}
          </TextButton>

          <TextButton
            color="white"
            shape="long"
            isClick={isClickArr[3]}
            handleClick={() => {
              setIsClickArr([false, false, false, true]);
              setLeftPosition('left-[33rem]');
            }}
          >
            {thirdText}
          </TextButton>
        </div>
        <div
          className={`transition-[left] relative h-1 w-60 mt-1 bg-hpBlue ${leftPosition}`}
        />
      </div>
    );
  }
}

SlideBar.propTypes = {
  num: PropTypes.number.isRequired,
  firstText: PropTypes.string.isRequired,
  secondText: PropTypes.string.isRequired,
  thirdText: PropTypes.string,
  isClickArr: PropTypes.arrayOf(PropTypes.bool.isRequired).isRequired,
  setIsClickArr: PropTypes.func.isRequired,
};

SlideBar.defaultProps = {
  thirdText: '',
};
export default SlideBar;
