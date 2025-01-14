import { useEffect, useState } from 'react';
import { FcFolder } from 'react-icons/fc';
import TextButton from '../atoms/TextButton';
import { dateTimeToDateAndTimes } from '../../utils/dateTimeToDate';
import getDirectory, { changeDirectoryName } from '../../apis/directory';
import { DirectoryType } from '../../types/directoryType';

// Props 타입 정의
interface FolderDetailTabProps {
  folderData: DirectoryType;
  breadscrumArray: string[];
  setDirectoryDatas: (data: DirectoryType[]) => void;
}

function FolderDetailTab({
  folderData,
  breadscrumArray,
  setDirectoryDatas,
}: FolderDetailTabProps) {
  const [folderName, setFolderName] = useState(folderData.fileName);

  useEffect(() => {
    setFolderName(folderData.fileName);
  }, [folderData]);
  console.log(folderData);
  return (
    <div className="w-full">
      <div className="w-full flex mt-8">
        <input
          type="text"
          value={folderName}
          className="w-[150px] font-bold mx-4 pl-4 leading-[30px] border-solid border-[1px] rounded-lg border-hpGray"
          onChange={(e) => {
            setFolderName(e.target.value);
          }}
        />
        <TextButton
          color="gray"
          moreStyle="w-[4rem]"
          handleClick={async () => {
            console.log(breadscrumArray);
            const absolutePath = breadscrumArray.join('/');
            console.log(absolutePath);
            try {
              if (absolutePath !== '/') {
                await changeDirectoryName(
                  `${absolutePath.slice(1)}/${folderData.fileName}`,
                  folderName,
                );
                const { data } = await getDirectory(`${absolutePath.slice(1)}`);
                console.log(data);
                setDirectoryDatas(data);
              } else {
                await changeDirectoryName(
                  `${absolutePath}${folderData.fileName}`,
                  folderName,
                );

                const { data } = await getDirectory(absolutePath);
                console.log(data);
                setDirectoryDatas(data);
              }
            } catch (e) {
              console.log(e);
            }
          }}
        >
          수정
        </TextButton>
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
          <span className="font-bold">폴더</span>
        </div>
        {/* <div className="flex mt-2">
          <span className="block w-[100px] text-[#BFBFBF]">크기</span>
          <span className="font-bold">10GB</span>
        </div> */}
        <div className="flex mt-2">
          <span className="block w-[100px] text-[#BFBFBF]">올린 날짜</span>
          <span className="font-bold">
            {dateTimeToDateAndTimes(new Date(folderData.createdTime))}
          </span>
        </div>
        {/* <div className="flex mt-2">
          <span className="block w-[100px] text-[#BFBFBF]">수정 날짜</span>
          <span className="font-bold">2030-08-20 08:02:04</span>
        </div> */}
      </div>
    </div>
  );
}

export default FolderDetailTab;
