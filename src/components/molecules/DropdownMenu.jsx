import PropTypes from 'prop-types';
import { useState } from 'react';
import { BsTriangleFill } from 'react-icons/bs';

function DropdownMenu({ textArr, selectedIndex, setSelectedIndex, size }) {
  const [isOpen, setIsOpen] = useState(false);

  let sizeByWidth = '';
  let sizeByTextSize = '';

  if (size === 'long') {
    sizeByWidth = 'w-[25.25rem]';
    sizeByTextSize = 'text-md';
  } else if (size === 'normal') {
    sizeByWidth = 'w-60';
    sizeByTextSize = 'text-xl';
  } else if (size === 'small') {
    sizeByWidth = 'w-32';
    sizeByTextSize = 'text-xl';
  }

  const dropdownList = textArr.map((text, index) => {
    const resultNode =
      selectedIndex !== index ? (
        <button
          type="button"
          className={`w-[24.75rem] h-[3rem] bg-hpLightGray z-10 flex items-center font-bold ${sizeByTextSize} hover:bg-hpGray`}
          key={text}
          onClick={() => {
            setSelectedIndex(index);
            setIsOpen(false);
          }}
        >
          <div
            className={`w-[23rem] h-[2.4rem] leading-[2.4rem] ${sizeByTextSize} text-left pl-6 whitespace-nowrap overflow-hidden hover:overflow-x-auto`}
          >
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
      className={`${sizeByWidth} h-[16.3rem] ${isOpen ? 'border-[0.075rem] rounded-lg border-hpLightkBlack border-solid' : ''}`}
    >
      <button
        type="button"
        className={`${sizeByWidth} h-[2.4rem] font-bold  border-hpLightkBlack border-solid flex items-center ${isOpen ? 'border-b-[0.075rem]' : 'border-[0.075rem] rounded-lg'}`}
        key={textArr[selectedIndex]}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        <div
          className={`w-[23rem] h-[2.4rem] leading-[2.4rem] ${sizeByTextSize} text-left pl-6 whitespace-nowrap overflow-hidden hover:overflow-x-auto`}
        >
          {textArr[selectedIndex]}
        </div>
        <div
          className={`w-[1.875rem] transition-[transform] origin-center ${isOpen ? 'rotate-180 mr-5' : 'rotate-0 mr-4'}`}
        >
          <BsTriangleFill color="#BCBCBC" size="1.5rem" />
        </div>
      </button>
      {isOpen && (
        <div
          className={`${sizeByWidth} h-[13.6rem] flex flex-col overflow-y-auto`}
        >
          {filteredList}
        </div>
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
