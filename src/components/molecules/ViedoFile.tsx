import { SetStateAction, useEffect, useState } from 'react';
import { FcVideoFile } from 'react-icons/fc';

interface VideoFileProps {
  name: string; // 파일 이름
  setCheckedDirectoryArr: React.Dispatch<SetStateAction<number[]>>; // 선택된 디렉토리 배열을 업데이트하는 함수
  createTime: string; // 생성 시간 (ISO 문자열)
  index: number; // 파일의 고유 인덱스
  layout: 'line' | 'grid'; // 레이아웃 종류 ('line' 또는 'grid')
}

function VideoFile({
  name,
  setCheckedDirectoryArr,
  createTime,
  index,
  layout,
}: VideoFileProps) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setCheckedDirectoryArr((prev) => {
      const copiedCheckedDelectedDirectoryArr = [...prev];
      if (isChecked) {
        // 추가할때
        copiedCheckedDelectedDirectoryArr.push(index);
        return copiedCheckedDelectedDirectoryArr;
      }
      // 삭제할때
      return copiedCheckedDelectedDirectoryArr.filter(
        (deletedIndex) => deletedIndex !== index,
      );
    });
  }, [isChecked]);

  if (layout === 'line')
    return (
      <div>
        <div className="w-[1000px] flex justify-between items-center py-1  rounded-lg">
          <div className="flex items-center  pl-2">
            <input
              type="checkbox"
              onChange={() => {
                setIsChecked((prev) => !prev);
              }}
              className="w-[15px] h-[15px] border-solid border-[1px] border-hpLightGray bg-white hover:border-black"
            />
            <button
              type="button"
              aria-label="파일"
              className="flex items-center justify-center w-[25px] h-[25px] outline-none ml-3"
            >
              <FcVideoFile size="4rem" />
            </button>
            <span className="font-bold text-md ml-6">
              {name.slice(0, -4)}.mp4
            </span>
          </div>
          <span className="mr-6 font-bold text-md">
            {createTime.split('T')[0]} {createTime.split('T')[1].split(':')[0]}:
            {createTime.split('T')[1].split(':')[1]}:
            {createTime.split('T')[1].split(':')[2].split('.')[0]}
          </span>
        </div>
        <hr />
      </div>
    );

  return (
    <div className="w-[140px] h-[160px] flex flex-col items-center relative">
      <div className="group">
        <button
          type="button"
          aria-label="폴더"
          className={`flex items-center justify-center w-[130px] h-[130px] border-solid border-[1px] border-[#C0C0C0] rounded-3xl  ${isChecked ? 'bg-hpLightBlue/10' : 'group-hover:bg-hpLightBlue/10'}`}
        >
          <FcVideoFile size="4.5rem" />
        </button>
        <input
          type="checkbox"
          onChange={() => {
            setIsChecked((prev) => !prev);
          }}
          className={`w-[15px] h-[15px] absolute top-4 left-4 border-solid border-[1px] border-hpLightGray bg-white hover:border-black ${isChecked ? 'visible' : 'invisible group-hover:visible hover:visible'}`}
        />
      </div>
      <span className="font-bold text-sm mt-1">{name.slice(0, -4)}.mp4</span>
    </div>
  );
}

export default VideoFile;
