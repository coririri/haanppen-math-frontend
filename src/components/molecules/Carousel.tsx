import React from 'react';
import { BsFillTriangleFill } from 'react-icons/bs';

interface CarouselData {
  name: string; // name은 필수
  [key: string]: any; // 그 외의 속성은 유연하게 추가 가능
}

interface CarouselType {
  dataList: CarouselData[]; // Adjust this based on your actual data structure
  selectedDataindex: number;
  setSelectedDataindex: React.Dispatch<React.SetStateAction<number>>;
}

function Carousel({
  dataList,
  selectedDataindex,
  setSelectedDataindex,
}: CarouselType) {
  const handleChangeSelectedTeacherindex = (flag: 'left' | 'right') => {
    if (flag === 'left') {
      if (selectedDataindex === 0) {
        setSelectedDataindex(dataList.length - 1);
      } else {
        setSelectedDataindex((prev) => prev - 1);
      }
    } else if (flag === 'right') {
      if (selectedDataindex === dataList.length - 1) {
        setSelectedDataindex(0);
      } else {
        setSelectedDataindex((prev) => prev + 1);
      }
    }
  };
  console.log(dataList);
  return (
    <div>
      <div className="border-solid border-[1.5px] border-black flex items-center justify-between px-4 rounded-3xl w-[233px] h-[42px]">
        <button
          type="button"
          aria-label="왼쪽 넘기기"
          onClick={() => {
            handleChangeSelectedTeacherindex('left');
          }}
        >
          <BsFillTriangleFill
            className="origin-center rotate-[270deg]"
            size="20px"
            color="#BCBCBC"
          />
        </button>
        <span className="h-[42px] leading-[42px] text-lg font-bold overflow-hidden">
          {dataList[selectedDataindex].name}
        </span>
        <button
          type="button"
          aria-label="왼쪽 넘기기"
          onClick={() => {
            handleChangeSelectedTeacherindex('right');
          }}
        >
          <BsFillTriangleFill
            className="origin-center rotate-[90deg]"
            size="20px"
            color="#BCBCBC"
          />
        </button>
      </div>
    </div>
  );
}

export default Carousel;
