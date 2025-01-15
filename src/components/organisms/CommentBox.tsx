import React, { useEffect, useState } from 'react';
import { PiChalkboardTeacherFill } from 'react-icons/pi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import ImageModal from '../modals/ImageModal';
import imageUrlToSrc from '../../utils/imageUrlToSrc';
import { deleteComment, modifyComment } from '../../apis/comment';
import { getDetailQuestionById } from '../../apis/question';
import hw1 from '../../assests/hw1.jpg';
import DeleteCheckModal from '../modals/DeleteCheckModal';
import InputImagesButton from '../atoms/InputImagesButton';
import uploadImageToS3 from '../../apis/media';
import { CommentType } from '../../types/commentType';
import { ImageType } from '../../types/imageType';
import { QuestionFrontType } from '../../types/question';

interface CommentBoxProps {
  comment: CommentType;
  commentIndex: number;
  setData: React.Dispatch<React.SetStateAction<QuestionFrontType>>;
  setModificationData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      content: string;
      images?: string[];
    }>
  >;
}

function CommentBox({
  comment,
  commentIndex,
  setData,
  setModificationData,
}: CommentBoxProps) {
  const { id } = useParams();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [isModify, setIsModify] = useState(false);
  const [modificationCommentData, setModificationCommentData] = useState({
    content: '',
  });
  const [deleteCheckModalOpen, setDeleteCheckModalOpen] = useState(false);
  const [modificationImgPreview, setModificationImgPreview] = useState<
    string[]
  >([]);
  const [modificationImgFiles, setModificationImgFiles] = useState<File[]>([]);
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
        const response = await getDetailQuestionById(Number(id));

        const questionDetailData = {
          title: response.title,
          content: response.content,
          imageUrls: response.imageUrls.map((imageUrl: ImageType) =>
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

  const handleDeleteImagesButton = (index: number) => {
    setModificationImgFiles(() => [
      ...modificationImgFiles.slice(0, index),
      ...modificationImgFiles.slice(index + 1, modificationImgFiles.length),
    ]);
    setModificationImgPreview(() => [
      ...modificationImgPreview.slice(0, index),
      ...modificationImgPreview.slice(index + 1, modificationImgPreview.length),
    ]);
  };

  const handleModifyCompelte = async () => {
    try {
      const images = [];

      for (let i = 0; i < modificationImgFiles.length; i += 1) {
        const formData = new FormData();
        formData.append('image', modificationImgFiles[i]);
        const { data } = await uploadImageToS3(formData);
        images.push(data.imageUrl);
      }
      console.log(comment);
      await modifyComment(
        modificationCommentData,
        comment?.commentId,
        comment,
        images,
      );

      const getData = async () => {
        const response = await getDetailQuestionById(Number(id));

        const questionDetailData = {
          title: response.title,
          content: response.content,
          imageUrls: response.imageUrls.map(
            (imageUrl: { imageUrl: string | undefined }) =>
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

      await getData();

      setModificationCommentData({ content: '' });
      setModificationImgPreview([]);
      setModificationImgFiles([]);

      setIsModify(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleModifyCancel = async () => {
    setIsModify(false);
    setModificationImgPreview([]);
    setModificationImgFiles([]);
    setModificationCommentData({
      content: comment?.content,
    });
  };

  // URL을 감지하고 <a> 태그로 변환하는 함수
  const convertToLinks = (text: string) => {
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

  return (
    <div className="px-2 mb-24">
      <DeleteCheckModal
        deleteCheckModalOpen={deleteCheckModalOpen}
        setDeleteCheckModalOpen={setDeleteCheckModalOpen}
        handleDelete={async () => {
          await handleDelete();
          setDeleteCheckModalOpen(false);
        }}
      />
      <div className="mt-6 mb-2 flex items-center justify-between font-bold">
        <div className="flex items-center ml-2">
          <PiChalkboardTeacherFill size="3rem" />
          <span className="text-xl ">
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
              <div>
                <textarea
                  className="w-full h-[150px] px-4 py-2 text-xl font-bold border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={modificationCommentData.content}
                  placeholder="댓글 내용을 입력하세요..." // 플레이스홀더 추가
                  onChange={(e) => {
                    setModificationCommentData(() => ({
                      content: e.target.value,
                    }));
                  }}
                />
              </div>
            ) : (
              <span className="outline-none text-lg w-full block h-[150px]">
                {convertToLinks(comment?.content)}
              </span>
            )}
            <div className="flex justify-between items-center h-[80px]">
              {isModify ? (
                <div className="flex justify-between items-center">
                  <div className="flex w-[192px] overflow-x-auto">
                    {comment?.images.map((previewImage, index) => (
                      <div
                        className="relative  w-[96px] flex-shrink-0 "
                        key={previewImage?.imageUrl}
                      >
                        <button
                          className="absolute top-1 right-5"
                          type="button"
                          aria-label="댓글 이미지 삭제"
                          onClick={() => {
                            setData((prev) => {
                              console.log(prev);
                              const copiedData = {
                                questionDetailData: prev.questionDetailData,
                                commentsData: prev.commentsData,
                              };
                              copiedData.questionDetailData = {
                                title: prev.questionDetailData.title,
                                content: prev.questionDetailData.content,
                                imageUrls: [
                                  ...prev.questionDetailData.imageUrls,
                                ],
                                registeredDateTime:
                                  prev.questionDetailData.registeredDateTime,
                                registerMemberName:
                                  prev.questionDetailData.registerMemberName,
                                registerMemberGrade:
                                  prev.questionDetailData.registerMemberGrade +
                                  1,
                              };
                              copiedData.commentsData = prev.commentsData.map(
                                (commentData) => ({
                                  commentId: commentData.commentId,
                                  content: commentData.content,
                                  selected: commentData.selected,
                                  images: [...commentData.images],
                                  registeredDateTime:
                                    commentData.registeredDateTime,
                                  registeredMemberDetails: {
                                    memberId:
                                      commentData.registeredMemberDetails
                                        .memberId,
                                    memberName:
                                      commentData.registeredMemberDetails
                                        .memberName,
                                    memberGrade:
                                      commentData.registeredMemberDetails
                                        .memberGrade,
                                    role: commentData.registeredMemberDetails
                                      .role,
                                  },
                                }),
                              );
                              copiedData.commentsData[
                                commentIndex
                              ].images.splice(index, 1);
                              return copiedData;
                            });
                          }}
                        >
                          <div>
                            <AiFillCloseCircle size="16px" />
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setModalImage(
                              imageUrlToSrc(previewImage?.imageUrl),
                            );
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
                    {modificationImgPreview.map((previewImage, index) => (
                      <div
                        className="relative w-[96px] flex-shrink-0 "
                        key={previewImage}
                      >
                        <button
                          className="absolute top-1 right-5"
                          type="button"
                          aria-label="댓글 이미지 삭제"
                          onClick={() => {
                            handleDeleteImagesButton(index);
                          }}
                        >
                          <div>
                            <AiFillCloseCircle size="16px" />
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setModalImage(previewImage);
                            setModalOpen(true);
                          }}
                        >
                          <img
                            src={previewImage}
                            alt="이미지"
                            className="w-[80px] h-[80px] mr-4"
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col h-[80px] items-center justify-center">
                    <InputImagesButton
                      setImgFiles={setModificationImgFiles}
                      setImgPreview={setModificationImgPreview}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex w-[300px] overflow-x-auto">
                  {comment?.images.map((previewImage) => (
                    <div
                      key={previewImage?.imageUrl}
                      className="w-[96px] flex-shrink-0 "
                    >
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentBox;
