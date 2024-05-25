import React, { useRef } from 'react';
import { AiOutlineFileImage } from 'react-icons/ai';

function InputImageButton({ setImgFiles, setImgePreview }) {
  const imgRef = useRef();

  const saveImgFile = () => {
    const file = imgRef.current.files.item(0);
    setImgFiles((prev) => [...prev, file]);
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
        <div className="w-[113px] h-[44px] border-[1.5px] border-solid border-hpBlack rounded-md">
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
        accept="image/png, image/jpeg"
        capture="environment"
        className="hidden"
        onChange={saveImgFile}
      />
    </form>
  );
}

export default InputImageButton;
