import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AiOutlineRight } from 'react-icons/ai';
import TextButton from '../atoms/TextButton';
import Folder from '../molecules/Folder';
import VideoFile from '../molecules/ViedoFile';
import FileDetailTab from '../molecules/FileDetailTab';
import FolderDetailTab from '../molecules/FolderDetailTab';
import getDirectory, { deleteDirectory } from '../../apis/directory';
import CreateFolderModal from '../modals/CreateFolderModal';

function VedioManagementPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const breadscrumb = searchParams.get('breadscrum') || '/'; // 기본값을 "홈"으로 설정

  const [breadscrumArray, setBreadscrumArray] = useState([
    breadscrumb,
    '09.12',
  ]); // breadscrum을 List로 가지고 있는 상태 값
  const [directoryDatas, setDirectoryDatas] = useState([]); // 현재 UI상의 디렉토리 데이터 상태 값
  const [isFolderCreateModalOpen, setIsFolderCreateModalOpen] = useState(false); // 디렉토리 생성 모달 Open 상태 값
  const [checkedDirectoryArr, setCheckedDirectoryArr] = useState([]); // 선택된 디렉토리 리스트를 위한 데이터를 디렉토리 이름으로 가지고 있는 리스트 상태 값

  useEffect(() => {
    const fetchData = async (absolutePath) => {
      try {
        const { data } = await getDirectory(absolutePath);
        setDirectoryDatas(data);
      } catch (e) {
        console.log(e);
      }
    };
    setBreadscrumArray(searchParams.get('breadscrum').split('_'));
    const curSearchPrams = searchParams.get('breadscrum').split('_');

    const absolutePath = curSearchPrams.join('/');
    if (absolutePath !== '/') fetchData(absolutePath.slice(1));
    else fetchData(absolutePath);
  }, [searchParams.get('breadscrum')]); // 브레드 스크럼이 바뀔때마다 directoryDatas값을 서버로 부터 받아옴

  const handleDeleteDirectory = async (targetDirectory) => {
    try {
      const absolutePath = breadscrumArray.join('/');
      console.log(absolutePath);
      if (absolutePath !== '/') {
        await deleteDirectory(`${absolutePath.slice(1)}/${targetDirectory}`);
      } else {
        await deleteDirectory(`${absolutePath}${targetDirectory}`);
      }
    } catch (e) {
      console.log(e);
    }
  }; // 개별 디렉토리를 삭제하는 메서드
  console.log(checkedDirectoryArr);

  return (
    <div>
      <CreateFolderModal
        modalOpen={isFolderCreateModalOpen}
        setModalOpen={setIsFolderCreateModalOpen}
        breadscrumArray={breadscrumArray}
        setDirectoryDatas={setDirectoryDatas}
        setCheckedDirectoryArr={setCheckedDirectoryArr}
      />
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
                        setCheckedDirectoryArr([]);
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
            handleClick={() => {
              setIsFolderCreateModalOpen(true);
            }}
          >
            폴더 생성
          </TextButton>
          <TextButton
            color="gray"
            moreStyle="w-[9rem]  mr-4"
            handleClick={async () => {
              for (let i = 0; i < checkedDirectoryArr.length; i += 1) {
                console.log(checkedDirectoryArr[i]);
                const deletedForName =
                  directoryDatas[checkedDirectoryArr[i]].fileName;
                await handleDeleteDirectory(deletedForName);
              }
              setCheckedDirectoryArr([]);

              try {
                const absolutePath = breadscrumArray.join('/');
                if (absolutePath !== '/') {
                  const { data } = await getDirectory(absolutePath.slice(1));
                  console.log(data);
                  setDirectoryDatas(data);
                } else {
                  const { data } = await getDirectory(absolutePath);
                  console.log(data);
                  setDirectoryDatas(data);
                }
              } catch (e) {
                console.log(e);
              }
            }}
          >
            폴더 삭제
          </TextButton>
          <TextButton color="gray" moreStyle="w-[9rem]" handleClick={() => {}}>
            영상 업로드
          </TextButton>
        </div>
      </div>
      <hr className="w-[1300px] h-[1.3px] mx-auto bg-hpGray mt-3" />
      <div className="pl-24">
        <div className="flex justify-end px-4">
          <div className="grow grid grid-cols-4 gap-y-1 gap-x-0 mt-6">
            {directoryDatas.map((data, index) => {
              if (data.isDir === true) {
                return (
                  <Folder
                    key={data.createdTime}
                    name={data.fileName}
                    setCheckedDirectoryArr={setCheckedDirectoryArr}
                    index={index}
                  />
                );
              }
              return <VideoFile name={data.fileName} key={data.createdTime} />;
            })}
          </div>
          <div className="w-[300px] min-h-[530px] border-hpGray border-l-[1.3px] border-solid relative">
            {checkedDirectoryArr.length === 0 && (
              <div>선택 된 파일 및 폴더가 없습니다</div>
            )}
            {checkedDirectoryArr.length !== 0 &&
              directoryDatas[
                checkedDirectoryArr[checkedDirectoryArr.length - 1]
              ].isDir === true && (
                <FolderDetailTab
                  folderData={
                    directoryDatas[
                      checkedDirectoryArr[checkedDirectoryArr.length - 1]
                    ]
                  }
                  breadscrumArray={breadscrumArray}
                  setDirectoryDatas={setDirectoryDatas}
                />
              )}
            {checkedDirectoryArr.length !== 0 &&
              directoryDatas[
                checkedDirectoryArr[checkedDirectoryArr.length - 1]
              ].isDir === false && (
                <FileDetailTab
                  fileData={
                    directoryDatas[
                      checkedDirectoryArr[checkedDirectoryArr.length - 1]
                    ]
                  }
                />
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VedioManagementPage;
