import React, { useEffect, useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

interface PagenationProps {
  totalItemNumbers: number;
  itemNumPerPage: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const maxPage = 10; // 최대로 표시할 페이지 수 (기본적으로, 10개)
function Pagenation({
  totalItemNumbers = 0,
  itemNumPerPage,
  page,
  setPage,
}: PagenationProps) {
  const [pageUi, setPageUi] = useState({
    startPage: 1,
    pageLevel: 0, // 1~10페이지는 0, 11~20페이지는 1 이런 변수임
    pageNums:
      Math.ceil(totalItemNumbers / itemNumPerPage) - maxPage * 0 >= maxPage
        ? maxPage
        : Math.ceil(totalItemNumbers / itemNumPerPage) - maxPage * 0,
  });

  function leftPage() {
    if (page === 1) {
      return;
    }

    if (page - 1 < pageUi.startPage) {
      setPageUi((prev) => ({
        startPage: page - maxPage,
        pageLevel: prev.pageLevel - 1,
        pageNums:
          Math.ceil(totalItemNumbers / itemNumPerPage) -
            maxPage * (prev.pageLevel - 1) >=
          maxPage
            ? maxPage
            : Math.ceil(totalItemNumbers / itemNumPerPage) -
              maxPage * (prev.pageLevel - 1),
      }));
    }

    setPage((prev) => prev - 1);
  }

  function rightPage() {
    if (page === Math.ceil(totalItemNumbers / itemNumPerPage)) {
      return;
    }

    if (pageUi.startPage + maxPage - 1 < page + 1) {
      setPageUi((prev) => ({
        startPage: page + 1,
        pageLevel: prev.pageLevel + 1,
        pageNums:
          Math.ceil(totalItemNumbers / itemNumPerPage) -
            maxPage * (prev.pageLevel + 1) >=
          maxPage
            ? maxPage
            : Math.ceil(totalItemNumbers / itemNumPerPage) -
              maxPage * (prev.pageLevel + 1),
      }));
    }

    setPage((prev) => prev + 1);
  }

  useEffect(() => {
    setPageUi((prev) => ({
      startPage: prev.startPage,
      pageLevel: prev.pageLevel,
      pageNums:
        Math.ceil(totalItemNumbers / itemNumPerPage) -
          maxPage * prev.pageLevel >=
          maxPage ||
        Math.ceil(totalItemNumbers / itemNumPerPage) -
          maxPage * prev.pageLevel <
          0
          ? maxPage
          : Math.ceil(totalItemNumbers / itemNumPerPage) -
            maxPage * prev.pageLevel,
    }));
  }, [page, totalItemNumbers]);

  console.log(pageUi);
  return (
    <div className="flex justify-center">
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
      {Array(pageUi.pageNums)
        .fill(0)
        .map((value, index) => {
          const pageNumber = pageUi.startPage + index;
          return (
            <button
              key={pageNumber}
              type="button"
              onClick={() => {
                setPage(pageNumber);
              }}
            >
              <div
                className={`w-[30px] h-[30px] leading-[30px] text-center rounded-2xl  ${pageNumber === page ? 'text-white bg-hpHoverLightGray' : 'text-black hover:bg-hpWhiteBlue hover:bg-opacity-25 hover:text-hpDarkBlue'}`}
              >
                <span className="font-bold">{pageNumber}</span>
              </div>
            </button>
          );
        })}

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
