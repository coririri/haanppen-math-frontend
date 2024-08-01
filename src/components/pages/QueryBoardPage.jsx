import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillEdit } from 'react-icons/ai';
import { useInfiniteQuery } from '@tanstack/react-query';
import QueryBox from '../molecules/QueryBox';
import IconButton from '../atoms/IconButton';
import { getQuestionsList } from '../../apis/question';
import SlideBar from '../molecules/SlideBar';

function QueryBoardPage() {
  const navigate = useNavigate();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['questionList', 'date'],
      queryFn: getQuestionsList,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
    });

  const [slideBarIndex, setSlideBarIndex] = useState([true, false]);

  useEffect(() => {
    // if (data) {
    //   const newData = cloneDeep(data);
    //   newData?.pages.forEach((page) => {
    //     const questions = page.newData.contents;
    //     questions.forEach(async (question) => {
    //       if (question.images.length !== 0) {
    //         const { imageUrl } = question.images[0];
    //         console.log(imageUrl);
    //         const image = await fetchImage(imageUrl);
    //         question.images[0] = image;
    //       }
    //     });
    //   });
    // }
  }, [data]);
  console.log(data);
  if (localStorage.getItem('role') === 'STUDENT')
    return (
      <div className="w-full ">
        <div className="mx-auto w-[110px] my-2">
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

        <div>
          <SlideBar
            num={2}
            firstText="전체 질문"
            secondText="내 질문"
            isClickArr={slideBarIndex}
            setIsClickArr={setSlideBarIndex}
            isStudent
          />
        </div>

        <div className="w-[750px] mx-auto mt-4">
          <div>
            {data?.pages.map((page) => {
              const questions = page.contents;
              return questions.map((question) => {
                if (question.images.length === 0) return '';
                return (
                  <QueryBox
                    id={question.questionId}
                    imgSrc={question.images[0]}
                    grade={question.owner.memberGrade}
                    studentName={question.owner.memberName}
                    isSolved={question.solved}
                    teacherName={question.target.memberName}
                  />
                );
              });
            })}
          </div>
          {isLoading ? (
            <div>로딩중</div>
          ) : (
            <div>
              <div>
                <button
                  type="button"
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                >
                  {isFetchingNextPage
                    ? 'Loading more...'
                    : hasNextPage
                      ? 'Load More'
                      : 'Nothing more to load'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  return (
    <div className="w-full">
      <div className="mt-5 relative">
        <div className="w-[230px] h-[40px] border-solid border-black border-[1.75px] rounded-lg text-center mx-auto">
          <span className="text-2xl font-bold leading-10">전체 질문</span>
        </div>
        <div className="absolute right-[320px] top-[-1px]">
          <IconButton
            bgColor="white"
            icon={<AiFillEdit size="20px" className="text-black" />}
            text="질문 작성"
            handleClick={() => {
              navigate('/write-query');
            }}
          />
        </div>
      </div>
      <hr className="h-[1px] border-0 bg-hpGray w-[600px] mx-auto mt-3" />
      <div className="w-[750px] mx-auto mt-4">
        <div>
          {data?.pages.map((page) => {
            const questions = page.contents;
            return questions.map((question) => {
              if (question.images.length === 0) return '';
              return (
                <QueryBox
                  id={question.questionId}
                  imgSrc={question.images[0]}
                  grade={question.owner.memberGrade}
                  studentName={question.owner.memberName}
                  isSolved={question.solved}
                  teacherName={question.target.memberName}
                />
              );
            });
          })}
        </div>
        {isLoading ? (
          <div>로딩중</div>
        ) : (
          <div>
            <div>
              <button
                type="button"
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
              >
                {isFetchingNextPage
                  ? 'Loading more...'
                  : hasNextPage
                    ? 'Load More'
                    : 'Nothing more to load'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QueryBoardPage;
