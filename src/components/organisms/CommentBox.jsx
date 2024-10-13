import React, { useEffect, useState } from 'react';
import { PiChalkboardTeacherFill } from 'react-icons/pi';
import { useParams } from 'react-router-dom';
import ImageModal from '../modals/ImageModal';
import imageUrlToSrc from '../../utils/imageUrlToSrc';
import { deleteComment, modifyComment } from '../../apis/comment';
import { getDetailQuestionById } from '../../apis/question';
import hw1 from '../../assests/hw1.jpg';

function CommentBox({ comment, setData, setModificationData, isStudent }) {
  const { id } = useParams();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [isModify, setIsModify] = useState(false);
  const [modificationCommentData, setModificationCommentData] = useState({
    content: '',
  });

  useEffect(() => {
    setModificationCommentData({ content: comment?.content });
  }, [comment]);

  function handleEdit() {
    // 수정 로직 구현
    // navigate(`/question/${id}/modify`);
    setIsModify(true);
  }

  const handleDelete = async () => {
    // 삭제 로직 구현
    try {
      await deleteComment(comment?.commentId);

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
    } catch (e) {
      console.log(e);
    }
  };

  const handleModifyCompelte = async () => {
    try {
      await modifyComment(modificationCommentData, comment?.commentId);
    } catch (e) {
      console.log(e);
    }
  };

  const handleModifyCancel = async () => {
    setIsModify(false);
  };

  // URL을 감지하고 <a> 태그로 변환하는 함수
  const convertToLinks = (text) => {
    // URL 정규식
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    // 텍스트를 분할하고 URL이면 <a> 태그로 변환
    return text.split(urlRegex).map((part) =>
      urlRegex.test(part) ? (
        <a
          href={part}
          key={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {part}
        </a>
      ) : (
        part
      ),
    );
  };

  if (isStudent) {
    return (
      <div className="px-2">
        <div className="mt-6 mb-2 flex items-center justify-between font-bold">
          <div className="flex items-center ml-2">
            <PiChalkboardTeacherFill size="3rem" />
            <span className="text-xl">
              {comment?.registeredMemberDetails?.memberName}
            </span>
          </div>

          {/* 수정/삭제 버튼 */}
          {localStorage.getItem('userName') ===
          comment?.registeredMemberDetails.memberName ? (
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
        </div>
        <div className="w-full mt-6 mb-4 border-[1.5px] border-hpGray border-solid rounded-xl py-4 px-8">
          <div>
            <div>
              <ImageModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                imageSrc={modalImage}
              />
              {isModify ? (
                <textarea
                  type="text"
                  className="w-full h-full px-4 py-2 text-xl font-bold border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={modificationCommentData.content}
                  placeholder="댓글 내용을 입력하세요..." // 플레이스홀더 추가
                  onChange={(e) => {
                    setModificationCommentData(() => ({
                      content: e.target.value,
                    }));
                  }}
                />
              ) : (
                <span className="outline-none text-lg w-full block">
                  {convertToLinks(comment?.content)}
                </span>
              )}
              <div className="flex justify-between items-center mt-12">
                <div className="flex">
                  {comment?.images.map((previewImage) => (
                    <div key={previewImage?.imageUrl}>
                      <button
                        type="button"
                        onClick={() => {
                          setModalImage(imageUrlToSrc(previewImage?.imageUrl));
                          setModalOpen(true);
                        }}
                      >
                        <img
                          src={imageUrlToSrc(previewImage?.imageUrl)}
                          alt="이미지"
                          className="w-[80px] h-[80px] mr-4"
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="mt-6 mb-2 flex items-center font-bold justify-between">
        <div className="ml-2">
          <PiChalkboardTeacherFill size="3rem" />
          <span className="text-xl">
            {comment?.registeredMemberDetails?.memberName}
          </span>
        </div>
      </div>
      <div className="w-full mb-4 border-[1.5px] border-hpGray border-solid rounded-xl py-4 px-8">
        <div>
          <div>
            <ImageModal
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              imageSrc={modalImage}
            />
            <span className="outline-none text-lg w-[800px] block">
              {convertToLinks(comment?.content)}
            </span>
            <div className="flex justify-between items-center mt-12">
              <div className="flex">
                {comment?.images.map((previewImage) => (
                  <div key={previewImage}>
                    <button
                      type="button"
                      onClick={() => {
                        setModalImage(imageUrlToSrc(previewImage?.imageUrl));
                        setModalOpen(true);
                      }}
                    >
                      <img
                        src={imageUrlToSrc(previewImage?.imageUrl)}
                        alt="이미지"
                        className="w-[80px] h-[80px] mr-4"
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentBox;
