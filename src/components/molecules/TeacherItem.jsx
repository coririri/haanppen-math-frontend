import { useState } from 'react';
import TextButton from '../atoms/TextButton';

function TeacherItem({ name, id }) {
  const [isClick, setIsClick] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between my-2">
        <input type="checkbox" className="w-[16px] h-[16px]" />
        <span className="text-lg font-bold text-black w-[90px] text-center">
          {name}
        </span>
        <span className="text-lg font-bold text-black w-[160px]">{id}</span>
        <div className="w-[100px]">
          <TextButton
            color="gray"
            shape="square"
            isClick={isClick}
            handleClick={() => {
              setIsClick((prev) => !prev);
            }}
          >
            수정
          </TextButton>
        </div>
      </div>
      <hr className="h-[0.5px] border-0 bg-hpGray w-[800px] mx-auto mt-2" />
    </div>
  );
}

export default TeacherItem;
