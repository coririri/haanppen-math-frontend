import { BsBookmarkCheckFill, BsClock } from 'react-icons/bs';
import { BiCommentDots } from 'react-icons/bi';
import { AiFillEdit } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import IconButton from '../atoms/IconButton';
import {
  deleteQuestionById,
  getDetailQuestionById,
  modifyQuery,
} from '../../apis/question';
import imageUrlToSrc from '../../utils/imageUrlToSrc';
import gradeTransform from '../../utils/gradeTransform';
import dateTimeToDate from '../../utils/dateTimeToDate';
import WriteComment from '../organisms/WriteComment';
import CommentBox from '../organisms/CommentBox';
import hw1 from '../../assests/hw1.jpg';

function QuestionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [isWriteComment, setIsWriteComment] = useState(false);

  const [isModify, setIsModify] = useState(false);
  const [modificationData, setModificationData] = useState({
    title: '',
    conent: '',
  });

  useEffect(() => {
    const getData = async () => {
      const response = await getDetailQuestionById(id);

      const questionDetailData = {
        title: response.title,
        content: response.content,
        imageUrls: response.imageUrls.map((imageUrl) =>
          imageUrl.imageUrl
            ? imageUrlToSrc(response.imageUrls[0]?.imageUrl)
            : hw1,
        ),
        registeredDateTime: response.registeredDateTime,
        registerMemberName: response.registeredMember.memberName,
        registerMemberGrade: response.registeredMember.memberGrade + 1,
        targetMemberId: response.targetMember.memberId,
      };

      const commentsData = response.comments;

      setData({
        questionDetailData,
        commentsData,
      });
      // data를 사용하여 추가 작업을 수행합니다.

      setModificationData({
        title: response.title,
        content: response.content,
      });
    };

    getData();
  }, []);

  const handleEdit = async () => {
    // 수정 로직 구현
    setIsModify(true);
  };

  const handleDelete = async () => {
    // 삭제 로직 구현
    try {
      deleteQuestionById(id);
      navigate('/question-board');
    } catch (e) {
      console.log(e);
    }
  };

  const handleModifyCompelte = async () => {
    try {
      modifyQuery(
        modificationData,
        id,
        data?.questionDetailData.targetMemberId,
      );
    } catch (e) {
      console.log(e);
    }
  };

  const handleModifyCancel = async () => {
    setIsModify(false);
  };

  if (localStorage.getItem('role') === 'STUDENT') {
    return (
      <div className="w-full">
        {/* 질문글 상단 */}
        <div className="w-full h-[30px] mx-auto mt-4 bg-hpLightGray">
          <div className="h-full flex items-center justify-between">
            <div className="h-full flex items-center ml-4">
              <BsBookmarkCheckFill />
              <span className="text-sm font-bold">
                {gradeTransform(data?.questionDetailData.registerMemberGrade)}
              </span>
              <span className="text-md ml-2 font-bold">
                {data?.questionDetailData.registerMemberName}
              </span>
            </div>
            <div className="h-full flex items-center mr-4">
              <BsClock />
              <span className="ml-1 font-bold pt-[1px]">
                {dateTimeToDate(data?.questionDetailData.registeredDateTime)}
              </span>
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <hr className="h-[1px] border-0 bg-hpGray w-full mx-auto mt-6 mb-2" />

        {/* 질문 제목 */}
        <div className="lg:w-[380px] md:w-[300px] w-[230px] mx-auto mt-4">
          {isModify ? (
            <input
              type="text"
              className="w-full px-4 py-2 text-xl font-bold text-center border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={modificationData.title}
              onChange={(e) => {
                setModificationData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }));
              }}
              placeholder="질문 제목을 입력하세요..." // 플레이스홀더 추가
            />
          ) : (
            <h1 className="text-xl font-bold text-center">
              {data?.questionDetailData.title || ''}
            </h1>
          )}
        </div>

        {/* 구분선 */}
        {data?.questionDetailData.title && (
          <hr className="h-[1px] border-0 bg-hpGray w-full mx-auto mt-2" />
        )}

        {/* 질문 텍스트 */}
        <div className="lg:w-[380px] md:w-[300px] w-[280px] mx-auto mt-4 px-2">
          {isModify ? (
            <input
              type="text"
              className="w-full px-4 py-2 text-md text-left border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={modificationData.content}
              onChange={(e) => {
                setModificationData((prev) => ({
                  ...prev,
                  content: e.target.value,
                }));
              }}
              placeholder="질문 내용을 입력하세요..." // 플레이스홀더 추가
            />
          ) : (
            <p className="text-md text-left">
              {data?.questionDetailData.content || ''}
            </p>
          )}
        </div>

        {/* 구분선 */}
        {data?.questionDetailData.content && (
          <hr className="h-[1px] border-0 bg-hpGray w-full mx-auto my-2" />
        )}

        {/* 질문 이미지 */}
        <div className="relative w-full mx-auto">
          {data?.questionDetailData.imageUrls.map((imageUrl) => (
            <img
              src={imageUrl}
              alt="숙제"
              className="lg:w-[380px] md:w-[380px] w-[300px] mx-auto my-2"
            />
          ))}
        </div>

        {/* 수정/삭제 버튼 */}
        {localStorage.getItem('userName') ===
        data?.questionDetailData.registerMemberName ? (
          isModify ? (
            <div className="flex space-x-2 my-2 justify-end mr-4">
              <button
                onClick={handleModifyCompelte}
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                type="button"
              >
                완료
              </button>
              <button
                onClick={handleModifyCancel}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                type="button"
              >
                취소
              </button>
            </div>
          ) : (
            <div className="flex space-x-2 my-2 justify-end mr-4">
              <button
                onClick={handleEdit}
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                type="button"
              >
                수정
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                type="button"
              >
                삭제
              </button>
            </div>
          )
        ) : null}

        {/* 구분선 */}
        <hr className="h-[1px] border-0 bg-hpGray w-full mx-auto" />

        {/* 댓글 섹션 */}
        <div className="mt-4 w-full mx-auto">
          <div>
            <div className="flex items-center">
              <BiCommentDots size="30px" className="mr-1" />
              <span
                className="text-2xl font-bold mr-1 text-[#FF6B00]"
                style={{
                  textShadow:
                    '-1px 0 black, 0 0.5px black, 0.5px 0 black, 0 -0.5px black',
                }}
              >
                {data?.commentsData.length}
              </span>
              <span
                className="text-xl font-bold"
                style={{
                  textShadow:
                    '-1px 0 black, 0 0.5px black, 0.5px 0 black, 0 -0.5px black',
                }}
              >
                Comments
              </span>
            </div>
            <hr className="h-[1px] border-0 bg-hpGray w-full mx-auto mt-[0.5px] mb-4" />
          </div>
          {data?.commentsData?.map((comment) => (
            <CommentBox comment={comment} key={comment.commentId} isStudent />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="w-full">
      {/* 질문글 상단 */}
      <div className="w-[400px] h-[30px] mx-auto mt-4 bg-hpLightGray">
        <div className="h-full flex items-center justify-between">
          <div className="h-full flex items-center ml-4">
            <BsBookmarkCheckFill />
            <span className="text-sm font-bold">
              {gradeTransform(data?.questionDetailData.registerMemberGrade)}
            </span>
            <span className="text-md ml-2 font-bold">
              {data?.questionDetailData.registerMemberName}
            </span>
          </div>
          <div className="h-full flex items-center mr-4">
            <BsClock />
            <span className="ml-1 font-bold pt-[1px]">
              {dateTimeToDate(data?.questionDetailData.registeredDateTime)}
            </span>
          </div>
        </div>
      </div>

      {/* 구분선 */}
      <hr className="h-[1px] border-0 bg-hpGray w-[400px] mx-auto mt-6 mb-2" />

      {/* 질문 제목 */}
      <div className="w-[400px] mx-auto mt-4">
        {isModify ? (
          <input
            type="text"
            className="w-full px-4 py-2 text-xl font-bold text-center border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={modificationData.title}
            onChange={(e) => {
              setModificationData((prev) => ({
                ...prev,
                title: e.target.value,
              }));
            }}
            placeholder="질문 제목을 입력하세요..." // 플레이스홀더 추가
          />
        ) : (
          <h1 className="text-xl font-bold text-center">
            {data?.questionDetailData.title || ''}
          </h1>
        )}
      </div>

      {/* 구분선 */}
      {data?.questionDetailData.title && (
        <hr className="h-[1px] border-0 bg-hpGray w-[400px] mx-auto mt-2" />
      )}

      {/* 질문 텍스트 */}
      <div className="w-[400px] mx-auto mt-4 px-2">
        {isModify ? (
          <input
            type="text"
            className="w-full px-4 py-2 text-md text-left border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={modificationData.content}
            onChange={(e) => {
              setModificationData((prev) => ({
                ...prev,
                content: e.target.value,
              }));
            }}
            placeholder="질문 내용을 입력하세요..." // 플레이스홀더 추가
          />
        ) : (
          <p className="text-md text-left">
            {data?.questionDetailData.content || ''}
          </p>
        )}
      </div>

      {/* 구분선 */}
      {data?.questionDetailData.content && (
        <hr className="h-[1px] border-0 bg-hpGray w-[400px] mx-auto mt-2" />
      )}

      {/* 질문 이미지 */}
      <div className="relative w-[400px] mx-auto">
        <img
          src={data?.questionDetailData.imageUrl}
          alt="숙제"
          className="w-[400px] mx-auto"
        />
      </div>

      {/* 수정/삭제 버튼 */}
      {localStorage.getItem('userName') ===
        data?.questionDetailData.registerMemberName ||
      localStorage.getItem('role') === 'TEACHER' ? (
        isModify ? (
          <div className="flex space-x-2 my-2 justify-end w-[400px] mx-auto pr-4">
            <button
              onClick={handleModifyCompelte}
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
              type="button"
            >
              완료
            </button>
            <button
              onClick={handleModifyCancel}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              type="button"
            >
              취소
            </button>
          </div>
        ) : (
          <div className="flex space-x-2 my-2 justify-end w-[400px] mx-auto pr-4">
            <button
              onClick={handleEdit}
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
              type="button"
            >
              수정
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              type="button"
            >
              삭제
            </button>
          </div>
        )
      ) : null}

      {/* 구분선 */}
      <hr className="h-[1px] border-0 bg-hpGray w-[400px] mx-auto" />

      {/* 댓글 섹션 */}
      <div className="mt-4 w-[400px] mx-auto">
        <div>
          <div className="flex items-center justify-left">
            <BiCommentDots size="30px" className="mr-1" />
            <span
              className="text-2xl font-bold mr-1 text-[#FF6B00]"
              style={{
                textShadow:
                  '-1px 0 black, 0 0.5px black, 0.5px 0 black, 0 -0.5px black',
              }}
            >
              {data?.commentsData.length}
            </span>
            <span
              className="text-xl font-bold"
              style={{
                textShadow:
                  '-1px 0 black, 0 0.5px black, 0.5px 0 black, 0 -0.5px black',
              }}
            >
              Comments
            </span>
          </div>
          <hr className="h-[1px] border-0 bg-hpGray w-[400px] mx-auto mt-[0.5px] mb-4" />
        </div>
        {!isWriteComment && (
          <div className="absolute bottom-8 left-0 right-0 flex justify-center">
            <IconButton
              bgColor="white"
              icon={<AiFillEdit size="26px" color="black" />}
              text="댓글 작성"
              handleClick={() => {
                setIsWriteComment(true);
                setTimeout(() => {
                  window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth', // 'auto'를 사용하면 부드러운 스크롤 없이 즉시 이동합니다.
                  });
                }, 200);
              }}
            />
          </div>
        )}
        {data?.commentsData?.map((comment) => (
          <CommentBox
            comment={comment}
            key={comment.commentId}
            setData={setData}
            setModificationData={setModificationData}
            isStudent
          />
        ))}

        {isWriteComment && (
          <div>
            <WriteComment
              setIsWriteComment={setIsWriteComment}
              questionId={id}
              setModificationData={setModificationData}
              setData={setData}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionDetailPage;
