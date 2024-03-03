import React from 'react';
import { BsTriangleFill } from 'react-icons/bs';

function ListedDatePicker() {
  return (
    <div className="flex justify-between w-[9rem] h-[1.75rem]">
      <div className="w-[2.75rem] h-[1.75rem] flex items-center border-solid border-hpGray rounded-lg border-[0.05rem]">
        <div className="w-[1.75rem] h-full text-center">
          <span className="font-bold text-md text-hpDarkBlue leading-[1.625] pl-1">
            24
          </span>
        </div>
        <div className="w-[1rem] h-[1.5rem] my-auto">
          <button
            type="button"
            aria-label="년도 올리기"
            className="block w-[0.7rem] h-[0.75rem] mx-auto"
          >
            <BsTriangleFill size="0.7rem" />
          </button>
          <button
            type="button"
            aria-label="년도 내리기"
            className="block w-[0.7rem] h-[0.75rem] mx-auto origin-center rotate-180"
          >
            <BsTriangleFill size="0.7rem" />
          </button>
        </div>
      </div>
      <div className="w-[2.75rem] h-[1.75rem] flex items-center border-solid border-hpGray rounded-lg border-[0.05rem]">
        <div className="w-[1.75rem] h-full text-center">
          <span className="font-bold text-md text-hpDarkBlue leading-[1.625] pl-1">
            24
          </span>
        </div>
        <div className="w-[1rem] h-[1.5rem] my-auto">
          <button
            type="button"
            aria-label="월 올리기"
            className="block w-[0.7rem] h-[0.75rem] mx-auto"
          >
            <BsTriangleFill size="0.7rem" />
          </button>
          <button
            type="button"
            aria-label="월 내리기"
            className="block w-[0.7rem] h-[0.75rem] mx-auto origin-center rotate-180"
          >
            <BsTriangleFill size="0.7rem" />
          </button>
        </div>
      </div>
      <div className="w-[2.75rem] h-[1.75rem] flex items-center border-solid border-hpGray rounded-lg border-[0.05rem]">
        <div className="w-[1.75rem] h-full text-center">
          <span className="font-bold text-md text-hpDarkBlue leading-[1.625] pl-1">
            24
          </span>
        </div>
        <div className="w-[1rem] h-[1.5rem] my-auto">
          <button
            type="button"
            aria-label="일 올리기"
            className="block w-[0.7rem] h-[0.75rem] mx-auto"
          >
            <BsTriangleFill size="0.7rem" />
          </button>
          <button
            type="button"
            aria-label="일 내리기"
            className="block w-[0.7rem] h-[0.75rem] mx-auto origin-center rotate-180"
          >
            <BsTriangleFill size="0.7rem" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ListedDatePicker;
