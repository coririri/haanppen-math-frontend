import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AiOutlineRight } from 'react-icons/ai';
import TextButton from '../atoms/TextButton';
import Folder from '../molecules/Folder';
import FileDetailTab from '../molecules/FileDetailTab';

const defaultFolderDetail = {
  name: '비바샘',
  size: 4.6,
  created_date: '2024.04.12. 오후 09:18',
  modified_date: '2023.08.12. 오후 09:18',
};

function VedioManagementPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const breadscrumb = searchParams.get('breadscrum') || '기본 값'; // 기본값을 "홈"으로 설정
  const [breadscrumArray, setBreadscrumArray] = useState([
    breadscrumb,
    '09.12',
  ]);

  useEffect(() => {
    setBreadscrumArray(searchParams.get('breadscrum').split('_'));
    const curSearchPrams = searchParams.get('breadscrum').split('_');
    const lastSearchParams = curSearchPrams[curSearchPrams.length - 1];
    console.log(lastSearchParams);
  }, [searchParams.get('breadscrum')]);

  return (
    <div>
      <div className="px-24">
        <div className="mt-8 flex items-center text-black">
          {breadscrumArray.map((breadscrumData, breadscrumIndex) => {
            if (breadscrumIndex === breadscrumArray.length - 1) {
              return (
                <div key={breadscrumData}>
                  <span className="text-lg font-bold">{breadscrumData}</span>
                </div>
              );
            }
            return (
              <div key={breadscrumData} className="flex items-center">
                <button
                  type="button"
                  onClick={() => {
                    let tempBreadscrum = '';
                    for (let i = 0; i < breadscrumArray.length; i += 1) {
                      if (i === 0) {
                        tempBreadscrum += breadscrumArray[i];
                      } else {
                        tempBreadscrum += `_${breadscrumArray[i]}`;
                      }
                      if (breadscrumArray[i] === breadscrumData) {
                        searchParams.set('breadscrum', tempBreadscrum);
                        setSearchParams(searchParams);
                        break;
                      }
                    }
                  }}
                >
                  <span className="text-lg mr-1">{breadscrumData}</span>
                </button>
                <AiOutlineRight size="1.5rem" className="mr-1" color="gray" />
              </div>
            );
          })}
        </div>
        <div className="mt-2">
          <TextButton
            color="gray"
            moreStyle="w-[9rem] mr-4"
            handleClick={() => {}}
          >
            폴더 생성
          </TextButton>
          <TextButton
            color="gray"
            moreStyle="w-[9rem] mr-4"
            handleClick={() => {}}
          >
            영상 업로드
          </TextButton>
          <TextButton color="gray" moreStyle="w-[9rem]" handleClick={() => {}}>
            영상 삭제
          </TextButton>
        </div>
      </div>
      <hr className="w-[1300px] h-[1.3px] mx-auto bg-hpGray mt-3" />
      <div className="pl-24">
        <div className="flex justify-end px-4">
          <div className="grow grid grid-cols-4 gap-y-12 gap-x-0 mt-6">
            <Folder name="중1-1 RPM" />
            <Folder name="중1-3 RPM" />
            <Folder name="중1-4 RPM" />
            <Folder name="중1-5 RPM" />
            <Folder name="중1-6 RPM" />
            <Folder name="중1-7 RPM" />
            <Folder name="중1-8 RPM" />
            <Folder name="중1-9 RPM" />
            <Folder name="중1-10 RPM" />
            <Folder name="중1-11 RPM" />
            <Folder name="중1-12 RPM" />
            <Folder name="중1-13 RPM" />
            <Folder name="중1-14 RPM" />
          </div>
          <div className="w-[300px] min-h-[530px] border-hpGray border-l-[1.3px] border-solid relative">
            <FileDetailTab defaultFolderDetail={defaultFolderDetail} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VedioManagementPage;
