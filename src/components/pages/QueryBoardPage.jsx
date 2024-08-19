import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillEdit } from 'react-icons/ai';
import { useInfiniteQuery } from '@tanstack/react-query';
import QueryBox from '../molecules/QueryBox';
import IconButton from '../atoms/IconButton';
import { getMyQuestionsList, getQuestionsList } from '../../apis/question';
import SlideBar from '../molecules/SlideBar';
import hw1 from '../../assests/hw1.jpg';

function QueryBoardPage() {
  const navigate = useNavigate();
  const observerElement = useRef();
  const myObserverElement = useRef();
  const [slideBarIndex, setSlideBarIndex] = useState([true, false]);

  const {
    data: allQuestionsData, // 여기서 data를 allQuestionsData로 변경
    fetchNextPage: fetchNextAllQuestionsPage,
    hasNextPage: hasNextAllQuestionsPage,
    isFetchingNextPage: isFetchingNextAllQuestionsPage,
  } = useInfiniteQuery({
    queryKey: ['questionList', 'date'],
    queryFn: getQuestionsList,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    enabled: slideBarIndex[0], // 첫 번째 슬라이드바 선택 시 활성화
  });

  // 내 질문 리스트 API 요청
  const {
    data: myQuestionsData,
    fetchNextPage: fetchNextMyQuestionsPage,
    hasNextPage: hasNextMyQuestionsPage,
    isFetchingNextPage: isFetchingNextMyQuestionsPage,
  } = useInfiniteQuery({
    queryKey: ['myQuestionList', 'date'],
    queryFn: getMyQuestionsList,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    enabled: slideBarIndex[1], // 두 번째 슬라이드바 선택 시 활성화
  });

  const onIntersection = () => {
    console.log(slideBarIndex[0], slideBarIndex[1]);
    if (
      !isFetchingNextAllQuestionsPage &&
      hasNextAllQuestionsPage &&
      slideBarIndex[0]
    ) {
      fetchNextAllQuestionsPage();
    }
  };

  const onMyIntersection = () => {
    console.log(slideBarIndex[0], slideBarIndex[1]);

    if (
      !isFetchingNextMyQuestionsPage &&
      hasNextMyQuestionsPage &&
      slideBarIndex[1]
    ) {
      fetchNextMyQuestionsPage();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);

    if (observerElement.current) {
      observer.observe(observerElement.current);
    }

    return () => {
      if (observerElement.current) {
        observer.unobserve(observerElement.current);
      }
    };
  }, [hasNextAllQuestionsPage, observerElement.current]);

  useEffect(() => {
    const myObserver = new IntersectionObserver(onMyIntersection);

    if (myObserverElement.current) {
      myObserver.observe(myObserverElement.current);
    }

    return () => {
      if (myObserverElement.current) {
        myObserver.unobserve(myObserverElement.current);
      }
    };
  }, [hasNextMyQuestionsPage, myObserverElement.current]);

  if (localStorage.getItem('role') === 'STUDENT') {
    if (slideBarIndex[0])
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
              {allQuestionsData?.pages.map((page) => {
                const questions = page.contents;
                return questions.map((question) => {
                  if (question.images.length === 0)
                    return (
                      <QueryBox
                        key={question.questionId}
                        id={question.questionId}
                        imgSrc={hw1}
                        grade={question.owner.memberGrade}
                        studentName={question.owner.memberName}
                        isSolved={question.solved}
                        teacherName={question.target.memberName}
                        isStudent
                      />
                    );
                  return (
                    <QueryBox
                      key={question.questionId}
                      id={question.questionId}
                      imgSrc={question.images[0]}
                      grade={question.owner.memberGrade}
                      studentName={question.owner.memberName}
                      isSolved={question.solved}
                      teacherName={question.target.memberName}
                      isStudent
                    />
                  );
                });
              })}
            </div>
            <div ref={observerElement} />
          </div>
        </div>
      );
    if (slideBarIndex[1])
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
              {myQuestionsData?.pages.map((page) => {
                const questions = page.contents;
                return questions.map((question) => {
                  if (question.images.length === 0)
                    return (
                      <QueryBox
                        key={question.questionId}
                        id={question.questionId}
                        imgSrc={hw1}
                        grade={question.owner.memberGrade}
                        studentName={question.owner.memberName}
                        isSolved={question.solved}
                        teacherName={question.target.memberName}
                        isStudent
                      />
                    );
                  return (
                    <QueryBox
                      key={question.questionId}
                      id={question.questionId}
                      imgSrc={question.images[0]}
                      grade={question.owner.memberGrade}
                      studentName={question.owner.memberName}
                      isSolved={question.solved}
                      teacherName={question.target.memberName}
                      isStudent
                    />
                  );
                });
              })}
            </div>
            <div ref={myObserverElement} />
          </div>
        </div>
      );
  }
  return (
    <div className="w-full">
      <div className="mt-5 relative">
        <div className="w-[230px] h-[40px] border-solid border-black border-[1.75px] rounded-lg text-center mx-auto">
          <span className="text-2xl font-bold leading-10">전체 질문</span>
        </div>
      </div>
      <hr className="h-[1px] border-0 bg-hpGray w-[600px] mx-auto mt-3" />
      <div className="w-[750px] mx-auto mt-4">
        <div>
          {allQuestionsData?.pages.map((page) => {
            const questions = page.contents;
            return questions.map((question) => {
              if (question.images.length === 0)
                return (
                  <QueryBox
                    key={question.questionId}
                    id={question.questionId}
                    imgSrc={hw1}
                    grade={question.owner.memberGrade}
                    studentName={question.owner.memberName}
                    isSolved={question.solved}
                    teacherName={question.target.memberName}
                  />
                );
              return (
                <QueryBox
                  key={question.questionId}
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
        <div ref={observerElement} />
      </div>
    </div>
  );
}

export default QueryBoardPage;
