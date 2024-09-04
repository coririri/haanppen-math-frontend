import { FcFolder } from 'react-icons/fc';
import TextButton from '../atoms/TextButton';

function FileDetailTab({ defaultFolderDetail }) {
  return (
    <div className="w-full">
      <div className="w-full flex mt-8">
        <span className="block w-[200px] font-bold mx-4 pl-4 leading-[30px] text-xl">
          {defaultFolderDetail.name}
        </span>
      </div>
      <div className="pl-8">
        <div className="mt-12">
          <span className="underline underline-offset-4 text-hpDarkBlue text-lg font-bold">
            상세 정보
          </span>
        </div>
        <div className="mt-4 ml-4 flex items-center justify-center w-[150px] h-[150px] border-solid border-[1px] border-[#C0C0C0] rounded-3xl outline-none bg-hpLightBlue/10 ">
          <FcFolder size="6rem" />
        </div>
        <div className="flex mt-16">
          <span className="block w-[100px] text-[#BFBFBF]">종류</span>
          <span className="font-bold">파일</span>
        </div>
        <div className="flex mt-2">
          <span className="block w-[100px] text-[#BFBFBF]">크기</span>
          <span className="font-bold">{defaultFolderDetail.size}GB</span>
        </div>
        <div className="flex mt-2">
          <span className="block w-[100px] text-[#BFBFBF]">올린 날짜</span>
          <span className="font-bold">{defaultFolderDetail.created_date}</span>
        </div>
        <div className="flex mt-2">
          <span className="block w-[100px] text-[#BFBFBF]">수정 날짜</span>
          <span className="font-bold">{defaultFolderDetail.modified_date}</span>
        </div>
        <div className="w-[9rem] mx-auto mt-24 mb-4">
          <TextButton color="gray" moreStyle="w-[9rem]" handleClick={() => {}}>
            영상 선택
          </TextButton>
        </div>
      </div>
    </div>
  );
}

export default FileDetailTab;
