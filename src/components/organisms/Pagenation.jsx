import React, { useEffect, useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

function Pagenation({ totalItemNumbers, size, page, setPage }) {
  const [maxPage, setMaxPage] = useState(10);
  const [pageUi, setPageUi] = useState(
    Array(
      Math.ceil(totalItemNumbers / size) > maxPage
        ? maxPage
        : Math.ceil(totalItemNumbers / size) - maxPage + 10,
    ).fill(0),
  );

  function leftPage() {
    if (page === 1) {
      return;
    }
    if (page === maxPage - 10 + 1) {
      setMaxPage((prev) => prev - 10);
    }
    setPage((prev) => prev - 1);
  }

  function rightPage() {
    if (page === Math.ceil(totalItemNumbers / size)) {
      return;
    }
    if (page === maxPage) {
      setMaxPage((prev) => prev + 10);
    }
    setPage((prev) => prev + 1);
  }

  useEffect(() => {
    setPageUi(
      Array(
        Math.ceil(totalItemNumbers / size) > maxPage
          ? 10
          : Math.ceil(totalItemNumbers / size) - maxPage + 10,
      ).fill(0),
    );
  }, [page]);
  console.log(page, maxPage);
  return (
    <div className="flex w-[360px] mx-auto">
      <button
        type="button"
        aria-label="왼쪽으로 페이지 넘기기"
        onClick={() => {
          leftPage();
        }}
      >
        <div className="w-[30px] h-[30px] hover:bg-slate-100 hover:rounded-xl flex justify-center items-center">
          <AiOutlineLeft className="font-bold" />
        </div>
      </button>
      {pageUi.map((value, index) => (
        <button
          type="button"
          onClick={() => {
            setPage(index - 10 + maxPage + 1);
          }}
        >
          <div
            className={`w-[30px] h-[30px] leading-[30px] text-center rounded-2xl  ${index - 10 + maxPage + 1 === page ? 'text-white bg-hpHoverLightGray' : 'text-black hover:bg-hpWhiteBlue hover:bg-opacity-25 hover:text-hpDarkBlue'}`}
          >
            <span className="font-bold">{index - 10 + maxPage + 1}</span>
          </div>
        </button>
      ))}

      <button
        type="button"
        aria-label="오른쪽으로 페이지 넘기기"
        onClick={() => {
          rightPage();
        }}
      >
        <div className="w-[30px] h-[30px] leading-[30px] text-center hover:bg-slate-100 hover:rounded-xl flex justify-center items-center">
          <AiOutlineRight className="font-bold" />
        </div>
      </button>
    </div>
  );
}

export default Pagenation;
