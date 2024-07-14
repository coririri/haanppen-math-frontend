import React, { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BsFillPencilFill } from 'react-icons/bs';
import writeComment from '../../apis/comment';
import ImageModal from '../modals/ImageModal';
import InputImagesButton from '../atoms/InputImagesButton';

function WriteComment({ setIsWriteComment, questionId }) {
  const [imgsFiles, setImgsFiles] = useState([]);
  const [imgsPreview, setImgsPreview] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const finishWrite = () => {
    const formData = new FormData();
    // imgsFiles.forEach((img) => {
    //   formData.append('images', img);
    // });
    formData.append('questionId ', questionId);
    formData.append('content', '테스트');
    writeComment(formData);
    // formdata를 활용해 질문 글 작성
  };

  const handleDeleteImagesButton = (index) => {
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
    <div className="w-full relative mt-6 mb-4 border-[1.5px] border-hpGray border-solid rounded-xl py-4 px-8">
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
            className="outline-none text-lg"
            cols={80}
            rows={5}
            placeholder="댓글 작성"
          />
          <div className="flex justify-between items-center mt-12">
            <div className="flex">
              {imgsPreview.map((previewImage, index) => (
                <div className="relative" key={previewImage}>
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
                setImgePreview={setImgsPreview}
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
