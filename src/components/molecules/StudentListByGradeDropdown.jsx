import { useState } from 'react';
import { BsTriangleFill } from 'react-icons/bs';

function StudentListByGradeDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <div className="w-full">
      <div className="w-full h-[40px] font-bold">
        <div className="w-full h-full">
          <div className="w-full h-full flex items-center justify-between">
            <button
              className="flex items-center"
              type="button"
              onClick={() => {
                setIsDropdownOpen((prev) => !prev);
              }}
            >
              <div className="ml-4">
                <BsTriangleFill
                  color="#BCBCBC"
                  size="1rem"
                  className={`${isDropdownOpen ? 'rotate-180' : 'rotate-90'}`}
                />
              </div>
              <div className="ml-4">
                <span className="text-md mr-2">초2</span>
                <span className="text-md text-hpLightkBlack">1명</span>
              </div>
            </button>
            <button type="button">
              <div className="mr-4 bg-[#BCF7FF] px-2 rounded-xl">
                <span className="text-xl">+</span>
              </div>
            </button>
          </div>
        </div>
      </div>
      <hr className="h-[0.8px] bg-hpGray w-full" />
      {isDropdownOpen && (
        <div className="bg-white">
          <button type="button" className="w-full h-[40px] font-bold">
            <div className="w-full h-full flex items-center justify-between">
              <div className="ml-4">
                <span className="text-md ml-8">이경순</span>
              </div>
              <div className="mr-[18px] bg-hpLightkBlack px-2 rounded-xl">
                <span className="text-sm text-white">+</span>
              </div>
            </div>
          </button>
          <hr className="h-[0.8px] bg-hpGray w-full" />
        </div>
      )}
    </div>
  );
}

export default StudentListByGradeDropdown;
