import { BsTriangleFill } from 'react-icons/bs';

function DropdownMenu({
  size,
  textArr,
  selectedIndex,
  setSelectedIndex,
  isOpen,
  handleClick,
}) {
  let sizeByWidth = '';
  let sizeByTextSize = '';
  let leftPaddingText = '';

  if (size === 'long') {
    sizeByWidth = 'w-[25.25rem]';
    sizeByTextSize = 'text-md';
    leftPaddingText = 'pl-6';
  } else if (size === 'normal') {
    sizeByWidth = 'w-60';
    sizeByTextSize = 'text-xl';
    leftPaddingText = 'pl-6';
  } else if (size === 'small') {
    sizeByWidth = 'w-32';
    sizeByTextSize = 'text-lg';
    leftPaddingText = 'pl-4';
  }

  const dropdownList = textArr.map((text, index) => {
    const resultNode =
      selectedIndex !== index ? (
        <button
          type="button"
          className={`${sizeByWidth} h-[40px] flex items-center font-bold ${sizeByTextSize} hover:bg-hpLightGray`}
          key={text}
          onClick={() => {
            setSelectedIndex(index);
            handleClick();
          }}
        >
          <div
            className={`${sizeByWidth} h-[36px] leading-[2.4rem] ${sizeByTextSize} text-left ${leftPaddingText} whitespace-nowrap overflow-hidden hover:overflow-x-auto`}
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

  if (size === 'long')
    return (
      <div className="w-[25.25rem] h-[2.4rem] relative">
        <button
          type="button"
          className={`w-[25.25rem] h-[2.4rem] font-bold  border-hpLightkBlack border-solid flex items-center ${isOpen ? 'border-[0.075rem] rounded-t-lg' : 'border-[0.075rem] rounded-lg'}`}
          key={textArr[selectedIndex]}
          onClick={() => {
            handleClick();
          }}
        >
          <div className="w-[23rem] h-[2.4rem] leading-[2.4rem] text-md text-left pl-6 whitespace-nowrap overflow-hidden hover:overflow-x-auto">
            {textArr[selectedIndex]}
          </div>
          <div
            className={`w-[2.25rem] transition-[transform] origin-center ${isOpen ? 'rotate-180 pl-3' : 'rotate-0'}`}
          >
            <BsTriangleFill color="#BCBCBC" size="1.5rem" />
          </div>
        </button>

        {isOpen && (
          <div className="absolute w-[25.25rem] bg-white z-10 border-x-[0.075rem] border-b-[0.075rem] border-hpLightkBlack border-solid flex flex-col overflow-y-auto overflow-x-hidden">
            {filteredList}
          </div>
        )}
      </div>
    );

  if (size === 'normal')
    return (
      <div className="w-60 h-[2.4rem] relative">
        <button
          type="button"
          className={`w-60 h-[2.4rem] font-bold  border-hpLightkBlack border-solid flex items-center ${isOpen ? 'border-[0.075rem] rounded-t-lg' : 'border-[0.075rem] rounded-lg'}`}
          key={textArr[selectedIndex]}
          onClick={() => {
            handleClick();
          }}
        >
          <div className="w-56 h-[2.4rem] leading-[2.4rem] text-xl text-left pl-6 whitespace-nowrap overflow-hidden hover:overflow-x-auto">
            {textArr[selectedIndex]}
          </div>
          <div
            className={`w-4 transition-[transform] origin-center ${isOpen ? 'rotate-180 mr-2' : 'rotate-0 mr-4'}`}
          >
            <BsTriangleFill color="#BCBCBC" size="1.5rem" />
          </div>
        </button>

        {isOpen && (
          <div className="absolute w-60  bg-white z-10 border-x-[0.075rem] border-b-[0.075rem] border-hpLightkBlack border-solid flex flex-col overflow-y-auto overflow-x-hidden">
            {filteredList}
          </div>
        )}
      </div>
    );

  if (size === 'small')
    return (
      <div className="w-24 h-[36px] relative">
        <button
          type="button"
          className={`w-24 h-[36px] font-bold  border-hpGray border-solid flex items-center ${isOpen ? 'border-[0.075rem] rounded-t-lg' : 'border-[0.075rem] rounded-lg'}`}
          key={textArr[selectedIndex]}
          onClick={() => {
            handleClick();
          }}
        >
          <div className="w-30 h-[2.4rem] leading-[2.4rem] text-lg text-left pl-4 whitespace-nowrap overflow-hidden hover:overflow-x-auto">
            {textArr[selectedIndex]}
          </div>
          <div
            className={`w-2 transition-[transform] origin-center ${isOpen ? 'rotate-180 ml-6' : 'rotate-0 ml-4'}`}
          >
            <BsTriangleFill color="#BCBCBC" size="1rem" />
          </div>
        </button>

        {isOpen && (
          <div className="absolute w-24  bg-white z-10 border-x-[0.075rem] border-b-[0.075rem] border-hpGray border-solid flex flex-col overflow-y-auto overflow-x-hidden">
            {filteredList}
          </div>
        )}
      </div>
    );
}

export default DropdownMenu;
