import React, { useState } from 'react';
import { PiChalkboardTeacherFill } from 'react-icons/pi';
import ImageModal from '../modals/ImageModal';
import imageUrlToSrc from '../../utils/imageUrlToSrc';

function CommentBox({ comment, isStudent }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');

  function handleEdit() {
    // 수정 로직 구현
    // navigate(`/question/${id}/modify`);
  }

  const handleDelete = async () => {
    // 삭제 로직 구현
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
          {localStorage.getItem('userName') ===
          comment?.registeredMemberDetails?.memberName ? (
            <div className="flex space-x-2 my-2 justify-end  mr-4">
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
              <span className="outline-none text-lg w-full block">
                {convertToLinks(comment?.content)}
              </span>
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
