import { BsBookmarkCheckFill, BsClock } from 'react-icons/bs';
import { BiCommentDots } from 'react-icons/bi';
import { AiFillEdit } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';
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
import DeleteCheckModal from '../modals/DeleteCheckModal';
import InputImageButton from '../atoms/InputImageButton';
import { QuestionFrontType } from '../../types/question';

function QuestionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<QuestionFrontType>({
    questionDetailData: {
      title: '',
      content: '',
      imageUrls: [],
      registeredDateTime: '',
      registerMemberName: '',
      registerMemberGrade: 0,
      targetMemberId: -1,
    },
    commentsData: [],
  });
  const [isWriteComment, setIsWriteComment] = useState<boolean>(false);
  const [imgsSrc, setImgsSrc] = useState<string[]>([]);

  const [isModify, setIsModify] = useState<boolean>(false);
  const [modificationData, setModificationData] = useState<{
    title: string;
    content: string;
    images?: string[];
  }>({
    title: '',
    content: '',
    images: [],
  });
  const [deleteCheckModalOpen, setDeleteCheckModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      const response = await getDetailQuestionById(Number(id));

      const questionDetailData = {
        title: response.title,
        content: response.content,
        imageUrls: response.imageUrls.map((imageUrl: { imageUrl: string }) =>
          imageUrl.imageUrl ? imageUrlToSrc(imageUrl.imageUrl) : hw1,
        ),
        registeredDateTime: response.registeredDateTime,
        registerMemberName: response.registeredMember.memberName,
        registerMemberGrade: response.registeredMember.memberGrade + 1,
        targetMemberId: response.targetMember?.memberId,
      };

      const commentsData = response.comments;

      setData({
        questionDetailData,
        commentsData,
      });
      // data를 사용하여 추가 작업을 수행합니다.
      console.log({
        questionDetailData,
        commentsData,
      });
      setModificationData({
        title: response.title,
        content: response.content,
        images: response.imageUrls.map(
          (value: { imageUrl: string }) => value.imageUrl,
        ),
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
      await deleteQuestionById(Number(id));
      navigate('/question-board');
    } catch (e) {
      console.log(e);
    }
  };

  const handleModifyCompelte = async () => {
    if (data === undefined) return;

    try {
      await modifyQuery(
        modificationData,
        Number(id),
        data.questionDetailData.targetMemberId ?? -1,
        imgsSrc,
      );

      setImgsSrc([]);

      const getData = async () => {
        const response = await getDetailQuestionById(Number(id));

        const questionDetailData = {
          title: response.title,
          content: response.content,
          imageUrls: response.imageUrls.map((imageUrl: { imageUrl: string }) =>
            imageUrl.imageUrl ? imageUrlToSrc(imageUrl.imageUrl) : hw1,
          ),
          registeredDateTime: response.registeredDateTime,
          registerMemberName: response.registeredMember.memberName,
          registerMemberGrade: response.registeredMember.memberGrade + 1,
          targetMemberId: response.targetMember?.memberId,
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
          images: response.imageUrls.map(
            (value: { imageUrl: string }) => value.imageUrl,
          ),
        });
      };

      await getData();

      setIsModify(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleModifyCancel = async () => {
    setIsModify(false);
  };

  const handleDeleteImageButton = (index: number) => {
    setImgsSrc(() => [
      ...imgsSrc.slice(0, index),
      ...imgsSrc.slice(index + 1, imgsSrc.length),
    ]);
  };
  console.log(data);

  if (data === undefined) return <>대기</>;

  if (localStorage.getItem('role') === 'STUDENT') {
    return (
      <div className="w-full">
        {/* 질문글 상단 */}
        <DeleteCheckModal
          deleteCheckModalOpen={deleteCheckModalOpen}
          setDeleteCheckModalOpen={setDeleteCheckModalOpen}
          handleDelete={async () => {
            await handleDelete();
            setDeleteCheckModalOpen(false);
          }}
        />

        <div className="w-full h-[30px] mx-auto mt-4 bg-hpLightGray">
          <div className="h-full flex items-center justify-between">
            <div className="h-full flex items-center ml-4">
              <BsBookmarkCheckFill />
              <span className="text-sm font-bold">
                {gradeTransform(data.questionDetailData.registerMemberGrade)}
              </span>
              <span className="text-md ml-2 font-bold">
                {data.questionDetailData.registerMemberName}
              </span>
            </div>
            <div className="h-full flex items-center mr-4">
              <BsClock />
              <span className="ml-1 font-bold pt-[1px]">
                {dateTimeToDate(
                  new Date(data.questionDetailData.registeredDateTime),
                )}
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
          {isModify && modificationData.images
            ? modificationData.images.map((imageUrl, index) => (
                <div className="g:w-[404px] md:w-[404px] w-[300px] mx-auto mt-6 relative transition-transform transform hover:scale-105 duration-300">
                  <button
                    className="absolute right-4 top-2 bg-black rounded-lg p-1 transition-colors duration-300 hover:bg-red-600"
                    type="button"
                    aria-label="삭제"
                    onClick={() => {
                      setModificationData((prev) => {
                        const copiedModificationData = { ...prev };
                        if (copiedModificationData.images)
                          copiedModificationData.images = [
                            ...copiedModificationData.images,
                          ];
                        else copiedModificationData.images = [];
                        copiedModificationData.images.splice(index, 1);
                        console.log(copiedModificationData);
                        return copiedModificationData;
                      });
                    }}
                  >
                    <IoMdClose size="20px" color="white" />
                  </button>
                  <img
                    src={imageUrlToSrc(imageUrl)}
                    alt="숙제"
                    className="lg:w-[380px] md:w-[380px] w-[300px] mx-auto my-2"
                  />
                </div>
              ))
            : data?.questionDetailData.imageUrls.map((imageUrl) => (
                <img
                  src={imageUrl}
                  alt="숙제"
                  className="lg:w-[380px] md:w-[380px] w-[300px] mx-auto my-2"
                />
              ))}

          {/* 이미지 미리보기 */}
          {isModify && (
            <div className="block lg:w-[404px] md:w-[404px] w-[300px] mx-auto">
              {imgsSrc.map((src, index) => (
                <div className="g:w-[404px] md:w-[404px] w-[300px] mx-auto mt-6 relative transition-transform transform hover:scale-105 duration-300">
                  <button
                    className="absolute right-4 top-2 bg-black rounded-lg p-1 transition-colors duration-300 hover:bg-red-600"
                    type="button"
                    aria-label="삭제"
                    onClick={() => handleDeleteImageButton(index)}
                  >
                    <IoMdClose size="20px" color="white" />
                  </button>

                  <img
                    className="lg:w-[380px] md:w-[380px] w-[300px] mx-auto rounded-lg shadow-lg"
                    src={imageUrlToSrc(src)}
                    alt={`이미지 ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 수정/삭제 버튼 */}
        {localStorage.getItem('userName') ===
        data?.questionDetailData.registerMemberName ? (
          isModify ? (
            <div className="flex space-x-2 my-2 justify-end mr-4">
              <InputImageButton
                setImgsSrc={setImgsSrc}
                className="transition-transform transform hover:scale-110 duration-300 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
              />
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
                onClick={() => {
                  setDeleteCheckModalOpen(true);
                }}
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
          {data?.commentsData?.map((comment, commentIndex) => (
            <CommentBox
              comment={comment}
              key={comment.commentId}
              commentIndex={commentIndex}
              setData={setData}
              setModificationData={setModificationData}
            />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="w-full">
      {/* 질문글 상단 */}
      <DeleteCheckModal
        deleteCheckModalOpen={deleteCheckModalOpen}
        setDeleteCheckModalOpen={setDeleteCheckModalOpen}
        handleDelete={async () => {
          await handleDelete();
          setDeleteCheckModalOpen(false);
        }}
      />
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
              {dateTimeToDate(
                new Date(data.questionDetailData.registeredDateTime),
              )}
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
      <div className="relative w-full mx-auto">
        {isModify && modificationData.images
          ? modificationData.images.map((imageUrl, index) => (
              <div className="g:w-[404px] md:w-[404px] w-[300px] mx-auto mt-6 relative transition-transform transform hover:scale-105 duration-300">
                <button
                  className="absolute right-4 top-2 bg-black rounded-lg p-1 transition-colors duration-300 hover:bg-red-600"
                  type="button"
                  aria-label="삭제"
                  onClick={() => {
                    setModificationData((prev) => {
                      const copiedModificationData = { ...prev };
                      if (copiedModificationData.images)
                        copiedModificationData.images = [
                          ...copiedModificationData.images,
                        ];
                      else copiedModificationData.images = [];
                      copiedModificationData.images.splice(index, 1);
                      console.log(copiedModificationData);
                      return copiedModificationData;
                    });
                  }}
                >
                  <IoMdClose size="20px" color="white" />
                </button>
                <img
                  src={imageUrlToSrc(imageUrl)}
                  alt="숙제"
                  className="lg:w-[380px] md:w-[380px] w-[300px] mx-auto my-2"
                />
              </div>
            ))
          : data?.questionDetailData.imageUrls.map((imageUrl) => (
              <img
                src={imageUrl}
                alt="숙제"
                className="lg:w-[380px] md:w-[380px] w-[300px] mx-auto my-2"
              />
            ))}

        {/* 이미지 미리보기 */}
        {isModify && (
          <div className="block lg:w-[404px] md:w-[404px] w-[300px] mx-auto">
            {imgsSrc.map((src, index) => (
              <div className="g:w-[404px] md:w-[404px] w-[300px] mx-auto mt-6 relative transition-transform transform hover:scale-105 duration-300">
                <button
                  className="absolute right-4 top-2 bg-black rounded-lg p-1 transition-colors duration-300 hover:bg-red-600"
                  type="button"
                  aria-label="삭제"
                  onClick={() => handleDeleteImageButton(index)}
                >
                  <IoMdClose size="20px" color="white" />
                </button>

                <img
                  className="lg:w-[380px] md:w-[380px] w-[300px] mx-auto rounded-lg shadow-lg"
                  src={imageUrlToSrc(src)}
                  alt={`이미지 ${index + 1}`}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 수정/삭제 버튼 */}
      {localStorage.getItem('userName') ===
        data?.questionDetailData.registerMemberName ||
      localStorage.getItem('role') === 'TEACHER' ? (
        isModify ? (
          <div className="flex space-x-2 my-2 justify-end w-[400px] mx-auto pr-4">
            <InputImageButton
              setImgsSrc={setImgsSrc}
              className="transition-transform transform hover:scale-110 duration-300 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
            />
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
              onClick={() => {
                setDeleteCheckModalOpen(true);
              }}
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
        {data?.commentsData?.map((comment, commentIndex) => (
          <CommentBox
            comment={comment}
            commentIndex={commentIndex}
            key={comment.commentId}
            setData={setData}
            setModificationData={setModificationData}
          />
        ))}

        {isWriteComment && (
          <div>
            <WriteComment
              setIsWriteComment={setIsWriteComment}
              questionId={Number(id)}
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
