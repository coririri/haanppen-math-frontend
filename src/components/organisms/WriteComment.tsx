import React, { useRef, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BsFillPencilFill } from 'react-icons/bs';
import writeComment from '../../apis/comment';
import ImageModal from '../modals/ImageModal';
import InputImagesButton from '../atoms/InputImagesButton';
import { getDetailQuestionById } from '../../apis/question';
import imageUrlToSrc from '../../utils/imageUrlToSrc';
import hw1 from '../../assests/hw1.jpg';
import uploadImageToS3 from '../../apis/media';
import { QuestionFrontType } from '../../types/question';

interface WriteCommentProps {
  setIsWriteComment: React.Dispatch<React.SetStateAction<boolean>>;
  questionId: number;
  setModificationData: React.Dispatch<
    React.SetStateAction<{ title: string; content: string; images?: string[] }>
  >;
  setData: React.Dispatch<React.SetStateAction<QuestionFrontType>>;
}

function WriteComment({
  setIsWriteComment,
  questionId,
  setModificationData,
  setData,
}: WriteCommentProps) {
  const [imgsFiles, setImgsFiles] = useState<File[]>([]);
  const [imgsPreview, setImgsPreview] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<string>('');
  const commentRef = useRef<HTMLTextAreaElement>(null);

  const finishWrite = async () => {
    try {
      const images = [];

      for (let i = 0; i < imgsFiles.length; i += 1) {
        const formData = new FormData();
        formData.append('image', imgsFiles[i]);
        const { data } = await uploadImageToS3(formData);
        images.push(data.imageUrl);
      }

      if (commentRef.current === null) return;
      const dataToServer = {
        questionId,
        content: commentRef.current.value,
        images,
      };

      await writeComment(dataToServer);
      // formdata를 활용해 질문 글 작성
      setIsWriteComment(false);

      const getData = async () => {
        const response = await getDetailQuestionById(questionId);

        const questionDetailData = {
          title: response.title,
          content: response.content,
          imageUrls: response.imageUrls.map((imageUrl: { imageUrl: string }) =>
            imageUrl.imageUrl
              ? imageUrlToSrc(response.imageUrls[0]?.imageUrl)
              : hw1,
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
        });
      };

      getData();
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteImagesButton = (index: number) => {
    setImgsFiles(() => [
      ...imgsFiles.slice(0, index),
      ...imgsFiles.slice(index + 1, imgsFiles.length),
    ]);
    setImgsPreview(() => [
      ...imgsPreview.slice(0, index),
      ...imgsPreview.slice(index + 1, imgsPreview.length),
    ]);
  };

  return (
    <div className="w-[400px] mx-auto relative mt-6 mb-4 border-[1.5px] border-hpGray border-solid rounded-xl py-4 px-8">
      <button
        type="button"
        aria-label="댓글 작성 닫기 버튼"
        className="absolute top-3 right-5"
        onClick={() => {
          setIsWriteComment(false);
        }}
      >
        <AiFillCloseCircle size="20px" />
      </button>

      <div>
        <div>
          <ImageModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            imageSrc={modalImage}
          />
          <textarea
            ref={commentRef}
            className="w-full outline-none text-lg"
            cols={80}
            rows={5}
            placeholder="댓글 작성"
          />
          <div className="flex justify-between items-center mt-12">
            <div className="flex w-[192px] overflow-x-auto">
              {imgsPreview.map((previewImage, index) => (
                <div
                  className="relative w-[96px] flex-shrink-0"
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
            <div className="flex flex-col">
              <InputImagesButton
                setImgFiles={setImgsFiles}
                setImgPreview={setImgsPreview}
              />
              <button
                type="button"
                onClick={() => {
                  finishWrite();
                }}
              >
                <div className="flex items-center justify-center w-[113px] h-[44px] border-[1.5px] border-solid border-hpBlack rounded-md px-2 py-1 mt-1">
                  <BsFillPencilFill size="14px" className="mr-2" />
                  <span className="block leading-10 text-md font-bold">
                    작성 완료
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WriteComment;
