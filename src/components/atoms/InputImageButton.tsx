import React, { useRef } from 'react';
import { AiOutlineFileImage } from 'react-icons/ai';
import uploadImageToS3 from '../../apis/media';

interface InputImageButtonType extends React.HTMLAttributes<HTMLButtonElement> {
  setImgsSrc: React.Dispatch<React.SetStateAction<string[]>>;
  type?: 'one' | 'mutiple';
}

function InputImageButton({
  setImgsSrc,
  type = 'mutiple',
}: InputImageButtonType) {
  const imgRef = useRef<HTMLInputElement>(null);

  const saveImgFile = async () => {
    if (imgRef.current === null || imgRef.current.files === null) return;
    const file = imgRef.current.files.item(0);
    if (file === null) return;

    const formData = new FormData();
    formData.append('image', file);
    const { data } = await uploadImageToS3(formData);
    if (type === 'one') {
      setImgsSrc([data.imageUrl]);
    } else {
      setImgsSrc((prev) => [...prev, data.imageUrl]);
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
