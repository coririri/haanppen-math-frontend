import { useState } from 'react';
import { BsTriangleFill } from 'react-icons/bs';

interface GradeDropdownProps {
  textArr: string[]; // 드롭다운에 표시할 텍스트 배열
  selectedIndex: number; // 현재 선택된 텍스트의 인덱스
  setSelectedIndex: (index: number) => void; // 선택된 인덱스를 업데이트하는 함수
}

function GradeDropdown({
  textArr,
  selectedIndex,
  setSelectedIndex,
}: GradeDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownList = textArr.map((text, index) => {
    const resultNode =
      selectedIndex !== index ? (
        <button
          type="button"
          className="w-32  h-[40px] flex items-center font-bold text-lg  hover:bg-hpLightGray"
          key={text}
          onClick={() => {
            setSelectedIndex(index);
            setIsOpen((prev) => !prev);
          }}
        >
          <div className="w-32 h-[36px] leading-[2.4rem] text-lg text-left pl-4 whitespace-nowrap overflow-hidden hover:overflow-x-auto">
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
    <div className="w-24 h-[36px] relative">
      <button
        type="button"
        className={`w-24 h-[36px] font-bold  border-hpGray border-solid flex items-center ${isOpen ? 'border-[0.075rem] rounded-t-lg' : 'border-[0.075rem] rounded-lg'}`}
        key={textArr[selectedIndex]}
        onClick={() => {
          setIsOpen((prev) => !prev);
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

export default GradeDropdown;
