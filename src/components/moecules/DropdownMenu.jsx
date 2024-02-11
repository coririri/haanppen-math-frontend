import PropTypes from 'prop-types';
import { useState } from 'react';
import { BsTriangleFill } from 'react-icons/bs';

function DropdownMenu({ textArr, selectedIndex, setSelectedIndex, size }) {
  const [isOpen, setIsOpen] = useState(false);

  let sizeByWidth = '';
  let sizeByPaddingY = '';
  let sizeByContentPaddingY = '';
  if (size === 'normal') {
    sizeByWidth = 'w-60';
    sizeByPaddingY = 'py-4';
    sizeByContentPaddingY = 'py-2';
  } else if (size === 'small') {
    sizeByWidth = 'w-28';
    sizeByPaddingY = 'py-3';
    sizeByContentPaddingY = 'py-1';
  } else if (size === 'long') {
    sizeByWidth = 'w-[26rem]';
    sizeByPaddingY = 'py-3';
    sizeByContentPaddingY = 'py-1';
  }

  const dropdownList = textArr.map((text, index) => {
    const resultNode =
      selectedIndex !== index ? (
        <button
          type="button"
          className={`w-full ${sizeByPaddingY} hover:bg-hpLightGray inline-block font-semibold text-lg`}
          key={text}
          onClick={() => {
            setSelectedIndex(index);
            setIsOpen(false);
          }}
        >
          <div className="text-left pl-4 leading-[1.25rem] text-[1.25rem]">
            {text}
          </div>
        </button>
      ) : null;
    return resultNode;
  });

  const filteredList = dropdownList.filter(
    (text, index) => index !== selectedIndex,
  );

  return (
    <div
      className={`inline-block ${sizeByWidth} ${isOpen ? 'border-[0.075rem] rounded-lg border-hpLightkBlack border-solid' : ''}`}
    >
      <div
        className={`w-full h-[48px] inline-block font-semibold text-lg border-hpLightkBlack border-solid ${isOpen ? 'border-b-[0.075rem]' : 'border-[0.075rem] rounded-lg'}`}
      >
        <button
          type="button"
          className="w-full h-full flex justify-between items-center py-2"
          key={textArr[selectedIndex]}
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        >
          <div
            className={`pl-4 h-full ${sizeByContentPaddingY} leading-[1.5rem] text-[1.25rem]`}
          >
            {textArr[selectedIndex]}
          </div>
          <div
            className={`transition-[transform] origin-center ${isOpen ? 'rotate-180 pl-4' : 'rotate-0 pr-4'}`}
          >
            <BsTriangleFill color="#BCBCBC" size="1rem" />
          </div>
        </button>
      </div>
      {isOpen && (
        <div className="h-40 flex flex-col overflow-y-auto">{filteredList}</div>
      )}
    </div>
  );
}

DropdownMenu.propTypes = {
  textArr: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  selectedIndex: PropTypes.number.isRequired,
  setSelectedIndex: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['small', 'normal', 'long']).isRequired,
};

export default DropdownMenu;
