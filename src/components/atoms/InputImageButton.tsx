import React, { useRef } from 'react';
import Compressor from 'compressorjs';
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

  // 이미지 압축 함수 (new를 사용하는 방식)
  const compressImage = (file: File): Promise<Blob> =>
    new Promise((resolve, reject) => {
      // Compressor는 반드시 new로 호출해야 하므로 인스턴스를 생성하되 참조하지 않음
      // eslint-disable-next-line no-new
      new Compressor(file, {
        quality: 0.8, // 압축 품질 (0 ~ 1 범위)
        maxWidth: 800, // 최대 너비
        maxHeight: 800, // 최대 높이
        success: (compressedFile: Blob) => resolve(compressedFile), // Blob 타입으로 명시적으로 설정
        error: reject, // 압축 실패 시 reject
      });
    });

  const saveImgFile = async () => {
    if (imgRef.current === null || imgRef.current.files === null) return;
    const file = imgRef.current.files.item(0);
    if (file === null) return;

    try {
      // 이미지 압축
      const compressedFile = await compressImage(file);

      // 이미지 업로드
      const formData = new FormData();
      formData.append('image', compressedFile);
      const { data } = await uploadImageToS3(formData);

      // 이미지 URL 저장
      if (type === 'one') {
        setImgsSrc([data.imageUrl]);
      } else {
        setImgsSrc((prev) => [...prev, data.imageUrl]);
      }
    } catch (err) {
      console.error('이미지 압축 실패:', err);
    }
  };

  return (
    <form>
      <label htmlFor="imageUpload">
        <div className="px-2 h-[44px] border-[1.5px] border-solid border-hpBlack rounded-md bg-white">
          <div className="flex items-center justify-center">
            <div className="mr-2">
              <AiOutlineFileImage size="24px" />
            </div>
            {type === 'one' ? (
              <span className="block leading-10 text-md font-bold">
                대표 이미지 설정
              </span>
            ) : (
              <span className="block leading-10 text-md font-bold">
                사진 추가
              </span>
            )}
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
