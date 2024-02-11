import PropTypes from 'prop-types';
import { useState } from 'react';
import { BsTriangleFill } from 'react-icons/bs';

function DropdownMenu({ textArr, selectedIndex, setSelectedIndex, size }) {
  const [isOpen, setIsOpen] = useState(false);

  let sizeByWidth = '';
  let sizeByPaddingY = '';
  let sizeByTextSize = '';
  let sizeByPaddingX = '';

  if (size === 'long') {
    sizeByWidth = 'w-96';
    sizeByPaddingY = 'py-4';
    sizeByTextSize = 'text-sm';
    sizeByPaddingX = 'pl-4';
  } else if (size === 'normal') {
    sizeByWidth = 'w-60';
    sizeByPaddingY = 'py-3';
    sizeByTextSize = 'text-xl';
    sizeByPaddingX = 'pl-4';
  } else if (size === 'small') {
    sizeByWidth = 'w-32';
    sizeByPaddingY = 'py-3';
    sizeByTextSize = 'text-xl';
    sizeByPaddingX = 'pl-6';
  }

  const dropdownList = textArr.map((text, index) => {
    const resultNode =
      selectedIndex !== index ? (
        <button
          type="button"
          className={`w-full ${sizeByPaddingY} h-14 font-semibold ${sizeByTextSize} hover:bg-hpLightGray`}
          key={text}
          onClick={() => {
            setSelectedIndex(index);
            setIsOpen(false);
          }}
        >
          <div
            className={`text-left h-full overflow-hidden hover:overflow-auto ${sizeByPaddingX}`}
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
      className={`${sizeByWidth} h-54 ${isOpen ? 'border-[0.075rem] rounded-lg border-hpLightkBlack border-solid' : ''}`}
    >
      <button
        type="button"
        className={`w-full h-14 font-semibold  ${sizeByTextSize} border-hpLightkBlack border-solid flex justify-between items-center py-auto ${isOpen ? 'border-b-[0.075rem]' : 'border-[0.075rem] rounded-lg'}`}
        key={textArr[selectedIndex]}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        <div
          className={`h-full ${sizeByPaddingX} ${sizeByPaddingY} overflow-hidden hover:overflow-auto`}
        >
          {textArr[selectedIndex]}
        </div>
        <div
          className={`transition-[transform] origin-center ${isOpen ? 'rotate-180 pl-4' : 'rotate-0 pr-4'}`}
        >
          <BsTriangleFill color="#BCBCBC" size="1rem" />
        </div>
      </button>
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
