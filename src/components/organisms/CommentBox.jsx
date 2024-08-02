import React, { useState } from 'react';
import ImageModal from '../modals/ImageModal';

function CommentBox({ comment, isStudent }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  console.log(comment);
  if (isStudent) {
    return (
      <div className="w-[400px] mt-6 mb-4 border-[1.5px] border-hpGray border-solid rounded-xl py-4 px-8">
        <div>
          <div>
            <ImageModal
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              imageSrc={modalImage}
            />
            <textarea
              className="outline-none text-lg"
              cols={30}
              rows={4}
              value={comment?.content}
            />
            <div className="flex justify-between items-center mt-12">
              <div className="flex">
                {comment?.images.map((previewImage) => (
                  <div key={previewImage}>
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
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full mt-6 mb-4 border-[1.5px] border-hpGray border-solid rounded-xl py-4 px-8">
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
            value={comment?.content}
          />
          <div className="flex justify-between items-center mt-12">
            <div className="flex">
              {comment?.images.map((previewImage) => (
                <div key={previewImage}>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentBox;
