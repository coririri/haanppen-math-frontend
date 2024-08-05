import React, { useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

function Pagenation({ totalItemNumbers, size }) {
  const maxPage = 10;
  const [pages] = useState(Math.ceil(totalItemNumbers / size));
  const [pageUl] = useState(
    Array(maxPage < pages ? maxPage : pages - maxPage + 10).fill(0),
  );

  return (
    <div className="flex">
      <button type="button" aria-label="왼쪽으로 페이지 넘기기">
        <div className="w-[30px] h-[30px] hover:bg-slate-100 hover:rounded-xl flex justify-center items-center">
          <AiOutlineLeft className="font-bold" />
        </div>
      </button>
      {pageUl.map((value, index) => (
        <button type="button">
          <div className="w-[30px] h-[30px] leading-[30px] text-center hover:bg-hpWhiteBlue hover:bg-opacity-25 hover:rounded-2xl">
            <span className="font-bold hover:text-hpDarkBlue">
              {index - maxPage + 10 + 1}
            </span>
          </div>
        </button>
      ))}

      <button type="button" aria-label="오른쪽으로 페이지 넘기기">
        <div className="w-[30px] h-[30px] leading-[30px] text-center hover:bg-slate-100 hover:rounded-xl flex justify-center items-center">
          <AiOutlineRight className="font-bold" />
        </div>
      </button>
    </div>
  );
}

export default Pagenation;
