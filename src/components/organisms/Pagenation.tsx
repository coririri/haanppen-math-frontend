import React from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

interface PaginationProps {
  totalItemNumbers: number;
  itemNumPerPage: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  maxVisiblePages?: number; // 기본값 10
}

function Pagination({
  totalItemNumbers,
  itemNumPerPage,
  page,
  setPage,
  maxVisiblePages = 10,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItemNumbers / itemNumPerPage);

  // 현재 페이지 기준으로 시작 페이지 계산
  const currentBlock = Math.floor((page - 1) / maxVisiblePages);
  const startPage = currentBlock * maxVisiblePages + 1;
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  const handleClickPage = (pageNum: number) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setPage(pageNum);
    }
  };

  return (
    <div className="flex justify-center items-center gap-1 mt-6">
      {/* 왼쪽 버튼 */}
      <button
        type="button"
        onClick={() => handleClickPage(page - 1)}
        disabled={page === 1}
        className="w-[30px] h-[30px] flex items-center justify-center hover:bg-slate-100 rounded-xl disabled:opacity-30"
      >
        <AiOutlineLeft />
      </button>
      {/* 페이지 숫자 버튼 */}
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
        const pageNum = startPage + i;
        return (
          <button
            type="button"
            key={pageNum}
            onClick={() => handleClickPage(pageNum)}
            className={`w-[30px] h-[30px] leading-[30px] text-center rounded-2xl font-bold ${
              pageNum === page
                ? 'bg-hpHoverLightGray text-white'
                : 'text-black hover:bg-hpWhiteBlue hover:bg-opacity-25 hover:text-hpDarkBlue'
            }`}
          >
            {pageNum}
          </button>
        );
      })}

      {/* 오른쪽 버튼 */}
      <button
        type="button"
        onClick={() => handleClickPage(page + 1)}
        disabled={page === totalPages}
        className="w-[30px] h-[30px] flex items-center justify-center hover:bg-slate-100 rounded-xl disabled:opacity-30"
      >
        <AiOutlineRight />
      </button>
    </div>
  );
}

export default Pagination;