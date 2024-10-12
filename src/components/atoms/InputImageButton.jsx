import React, { useRef } from 'react';
import { AiOutlineFileImage } from 'react-icons/ai';

function InputImageButton({ setImgFiles, setImgePreview }) {
  const imgRef = useRef();

  const resizeImage = (file) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target.result;
      };

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800; // 최대 너비 설정
        const MAX_HEIGHT = 800; // 최대 높이 설정
        let { width } = img;
        let { height } = img;

        // 비율에 따라 크기 조정
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // 리사이즈된 이미지 데이터를 PNG 형식으로 변환
        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/png');
      };

      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });

  const saveImgFile = async () => {
    const file = imgRef.current.files.item(0);

    const resizedBlob = await resizeImage(file);
    const resizedFile = new File([resizedBlob], file.name, {
      type: 'image/png',
    });

    setImgFiles((prev) => [...prev, resizedFile]);
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgePreview((prev) => [...prev, reader.result]);
      };
    }
  };

  return (
    <form>
      <label htmlFor="imageUpload">
        <div className="w-[113px] h-[44px] border-[1.5px] border-solid border-hpBlack rounded-md bg-white">
          <div className="flex items-center justify-center">
            <div className="mr-2">
              <AiOutlineFileImage size="24px" />
            </div>
            <span className="block leading-10 text-md font-bold">
              사진 추가
            </span>
          </div>
        </div>
      </label>
      <input
        id="imageUpload"
        ref={imgRef}
        type="file"
        multiple
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={saveImgFile}
      />
    </form>
  );
}

export default InputImageButton;
