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

  const resizeImage = (file: File): Promise<Blob | null> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target !== null && typeof e.target.result === 'string')
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
        if (ctx !== null) ctx.drawImage(img, 0, 0, width, height);

        // 리사이즈된 이미지 데이터를 PNG 형식으로 변환
        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/png');
      };

      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });

  const saveImgFile = async () => {
    if (imgRef.current === null || imgRef.current.files === null) return;
    const file = imgRef.current.files.item(0);
    if (file === null) return;
    const resizedBlob = await resizeImage(file);
    if (resizedBlob === null) return;
    const resizedFile = new File([resizedBlob], file.name, {
      type: 'image/png',
    });

    const formData = new FormData();
    formData.append('image', resizedFile);
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
