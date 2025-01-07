import { useState } from 'react';
import { BsTriangleFill } from 'react-icons/bs';

interface TeacherDropdownProps {
  textArr: string[];
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}

function TeacherDropdown({
  textArr,
  selectedIndex,
  setSelectedIndex,
}: TeacherDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownList = textArr.map((text, index) => {
    const resultNode =
      selectedIndex !== index ? (
        <button
          type="button"
          className="w-42 h-[40px] flex items-center font-bold text-lg hover:bg-hpLightGray"
          key={text}
          onClick={() => {
            setSelectedIndex(index);
            setIsOpen((prev) => !prev);
          }}
        >
          <div className="w-42 h-[36px] leading-[2.4rem] text-lg text-left pl-6 whitespace-nowrap overflow-hidden hover:overflow-x-auto">
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
    <div className="w-40 h-[2.4rem] relative">
      <button
        type="button"
        className={`w-40 h-[2.4rem] font-bold  border-hpLightkBlack border-solid flex items-center ${isOpen ? 'border-[0.075rem] rounded-t-lg' : 'border-[0.075rem] rounded-lg'}`}
        key={textArr[selectedIndex]}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        <div className="w-56 h-[2.4rem] leading-[2.4rem] text-lg text-left pl-6 whitespace-nowrap overflow-hidden hover:overflow-x-auto">
          {textArr[selectedIndex]}
        </div>
        <div
          className={`w-4 transition-[transform] origin-center ${isOpen ? 'rotate-180 mr-2' : 'rotate-0 mr-4'}`}
        >
          <BsTriangleFill color="#BCBCBC" size="1.1rem" />
        </div>
      </button>

      {isOpen && (
        <div className="absolute w-40  bg-white z-10 border-x-[0.075rem] border-b-[0.075rem] border-hpLightkBlack border-solid flex flex-col overflow-y-auto overflow-x-hidden">
          {filteredList}
        </div>
      )}
    </div>
  );
}

export default TeacherDropdown;
