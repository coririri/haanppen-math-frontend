import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillEdit, AiOutlineSearch } from 'react-icons/ai';
import IconButton from '../atoms/IconButton';
import { getMyQuestionsList, getQuestionsList } from '../../apis/question';
import SlideBar from '../molecules/SlideBar';

import QueryList from '../molecules/QueryList';
import Pagenation from '../organisms/Pagenation';
import TextButton from '../atoms/TextButton';

interface Owner {
  memberId: number;
  memberName: string;
  memberGrade: number | null;
  role: 'student' | 'teacher';
}

interface Target {
  memberId: number;
  memberName: string;
  memberGrade: number | null;
  role: 'student' | 'teacher';
}

interface Question {
  questionId: number;
  title: string;
  registeredDateTime: string;
  solved: boolean;
  commentCount: number;
  viewCount: number;
  owner: Owner;
  target: Target | null;
}

interface PageInfo {
  totalItemSize: number;
  currentPage: number;
  pageSize: number;
}

function QueryBoardPage() {
  const navigate = useNavigate();

  const [slideBarIndex, setSlideBarIndex] = useState<boolean[]>([true, false]);
  const [queryListData, setQueryListData] = useState<Question[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchState, setSearchState] = useState<boolean>(false);

  const [page, setPage] = useState<number>(1);
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    totalItemSize: 0,
    currentPage: 0,
    pageSize: 8,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (slideBarIndex[0] === true) {
          const { data } = await getQuestionsList(page - 1, searchValue);

          setQueryListData(data.data);
          setPageInfo(data.pageInfo);
        } else {
          const { data } = await getMyQuestionsList(page - 1, searchValue);

          setQueryListData(data.data);
          setPageInfo(data.pageInfo);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [page, slideBarIndex, searchState, window.location.pathname]);

  if (localStorage.getItem('role') === 'STUDENT') {
    return (
      <div className="w-full">
        {/* SlideBar */}
        <div className="flex mt-2 ml-4 items-center justify-center">
          <SlideBar
            num={2}
            firstText="전체 질문"
            secondText="내 질문"
            isClickArr={slideBarIndex}
            setIsClickArr={setSlideBarIndex}
            isStudent
          />
          {/* 질문 작성 버튼 */}
          <div className="mx-4 w-[110px]">
            <IconButton
              bgColor="white"
              isStudent
              icon={<AiFillEdit size="20px" className="text-black" />}
              text="질문 작성"
              handleClick={() => {
                navigate('/write-query');
              }}
            />
          </div>
        </div>

        <div className="flex justify-center my-2">
          {/* 검색 UI */}
          <div className="relative w-[220px] ml-8">
            <input
              type="text"
              placeholder="질문 검색"
              className="w-full h-[31.2px] pl-4 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-lg hover:border-blue-400"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button
              className="absolute right-2 top-1 transition-transform transform hover:scale-110 duration-300"
              onClick={() => {
                setSearchState((prev) => !prev);
              }}
              type="button"
              aria-label="검색 버튼"
            >
              <AiOutlineSearch
                size="20px"
                className="text-black hover:text-blue-500"
              />
            </button>
          </div>
        </div>

        {/* 질문 리스트 */}
        <div className="w-[325px] mx-auto">
          <div>
            <div className="font-bold text-lg bg-[#F6F6F6] py-3 border-t-4 border-b-2 border-solid border-[#C9C9C9]">
              <span className="inline-block w-[60px] text-center ml-[10px] ">
                상태
              </span>
              <span className="inline-block w-[165px] text-center">제목</span>
              <span className="inline-block w-[80px] text-center mr-[10px]">
                선생님
              </span>
            </div>
            {queryListData.map((question) => (
              <QueryList
                key={question.questionId}
                question={question}
                isStudent
              />
            ))}
            {Array(8 - queryListData.length)
              .fill(0)
              .map(() => (
                <div className="font-bold text-md bg-white py-2 flex items-center min-h-[40px]">
                  <span className="inline-block w-[60px] text-center ml-[10px]" />
                  <span className="inline-block w-[165px] text-center" />
                  <span className="inline-block w-[80px] text-center mr-[10px]" />
                </div>
              ))}
          </div>
          <div />
        </div>
        <div className="w-full mx-auto my-1 mb-[65px]">
          <Pagenation
            page={page}
            setPage={setPage}
            totalItemNumbers={pageInfo?.totalItemSize}
            itemNumPerPage={8}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* SlideBar */}
      <div className="flex my-2 ml-4 items-center justify-center">
        <TextButton
          handleClick={() => {
            console.log('전체 질문 버튼 클릭');
          }}
          color="white"
          moreStyle={`w-[120px] mr-2 transition-transform transform hover:scale-105 duration-300 bg-blue-500 text-white'
              }`}
          isClick
          textMoreStyle="leading-[16px] text-md"
        >
          전체 질문
        </TextButton>

        {/* 검색 UI */}
        <div className="relative w-[220px] ml-2">
          <input
            type="text"
            placeholder="질문 검색"
            className="w-full h-[31.2px] pl-4 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-lg hover:border-blue-400"
            // value={searchQuery}
            // onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="absolute right-2 top-1 transition-transform transform hover:scale-110 duration-300"
            // onClick={handleSearch}
            type="button"
            aria-label="검색 버튼"
          >
            <AiOutlineSearch
              size="20px"
              className="text-black hover:text-blue-500"
            />
          </button>
        </div>
      </div>

      {/* 질문 리스트 */}
      <div className="w-[405px] mx-auto">
        <div>
          <div className="font-bold text-lg bg-[#F6F6F6] py-3 border-t-4 border-b-2 border-solid border-[#C9C9C9]">
            <span className="inline-block w-[60px] text-center ml-[10px] ">
              상태
            </span>
            <span className="inline-block w-[165px] text-center">제목</span>
            <span className="inline-block w-[80px] text-center">작성자</span>
            <span className="inline-block w-[80px] text-center mr-[10px]">
              선생님
            </span>
          </div>
          {queryListData.map((question) => (
            <QueryList
              key={question.questionId}
              question={question}
              isStudent={false}
            />
          ))}
          {Array(8 - queryListData.length)
            .fill(0)
            .map(() => (
              <div className="font-bold text-md bg-white py-2 flex items-center min-h-[40px]">
                <span className="inline-block w-[60px] text-center ml-[10px]" />
                <span className="inline-block w-[165px] text-center" />
                <span className="inline-block w-[80px] text-center" />
                <span className="inline-block w-[80px] text-center mr-[10px]" />
              </div>
            ))}
        </div>
        <div />
      </div>
      <div className="w-[360px] mx-auto my-1 ">
        <Pagenation
          page={page}
          setPage={setPage}
          totalItemNumbers={pageInfo?.totalItemSize}
          itemNumPerPage={8}
        />
      </div>
    </div>
  );
}

export default QueryBoardPage;
