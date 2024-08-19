import React, { useState } from 'react';
import { PiChalkboardTeacherFill } from 'react-icons/pi';
import ImageModal from '../modals/ImageModal';
import imageUrlToSrc from '../../utils/imageUrlToSrc';

function CommentBox({ comment, isStudent }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  console.log(comment);
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
      <div>
        <div className="mt-6 mb-2 flex items-center font-bold">
          <PiChalkboardTeacherFill size="3rem" />
          <span className="text-xl">
            {comment?.registeredMemberDetails?.memberName}
          </span>
        </div>
        <div className="w-[400px] mt-6 mb-4 border-[1.5px] border-hpGray border-solid rounded-xl py-4 px-8">
          <div>
            <div>
              <ImageModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                imageSrc={modalImage}
              />
              <span className="outline-none text-lg w-[340px] h-[140px] block">
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
      <div className="mt-6 mb-2 flex items-center font-bold">
        <PiChalkboardTeacherFill size="3rem" />
        <span className="text-xl">
          {comment?.registeredMemberDetails?.memberName}
        </span>
      </div>
      <div className="w-full mb-4 border-[1.5px] border-hpGray border-solid rounded-xl py-4 px-8">
        <div>
          <div>
            <ImageModal
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              imageSrc={modalImage}
            />
            <span className="outline-none text-lg w-[800px] h-[140px] block">
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
