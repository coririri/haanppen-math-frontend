import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AiOutlineRight } from 'react-icons/ai';
import TextButton from '../atoms/TextButton';
import Folder from '../molecules/Folder';
import VideoFile from '../molecules/ViedoFile';
import FileDetailTab from '../molecules/FileDetailTab';
import FolderDetailTab from '../molecules/FolderDetailTab';
import getDirectory, { deleteDirectory } from '../../apis/directory';
import CreateFolderModal from '../modals/CreateFolderModal';
import enrollVideo from '../../apis/video';
import VideoUploadingModal from '../modals/VideoUploadingModal';
// import enrollVideo from '../../apis/video';

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
  const [uploadingInfo, setUploadingInfo] = useState({
    current: 0,
    end: 0,
  });
  const [isVideoUploadingModalOpen, setIsVideoUploadingModalOpen] =
    useState(false);

  const videoRef = useRef(null);

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
      if (absolutePath !== '/') {
        await deleteDirectory(`${absolutePath.slice(1)}/${targetDirectory}`);
      } else {
        await deleteDirectory(`${absolutePath}${targetDirectory}`);
      }
    } catch (e) {
      console.log(e);
    }
  }; // 개별 디렉토리를 삭제하는 메서드

  const handleEnrollVideo = () => {
    const chunkSize = 1024 * 1024; // 1MB
    const file = videoRef.current.files[0];

    const tempAbsolutePath = breadscrumArray.join('/');
    let absolutePath = '';

    if (tempAbsolutePath !== '/') {
      absolutePath = `${tempAbsolutePath.slice(1)}`;
    } else {
      absolutePath = `${tempAbsolutePath}`;
    }

    // total size 계산
    const totalChunks = Math.ceil(file.size / chunkSize);
    let currentChunk = 0;
    setUploadingInfo({
      current: 0,
      end: totalChunks,
    });

    // 동영상 업로드 로딩창 열림
    setIsVideoUploadingModalOpen(true);

    // chunk file 전송
    const sendNextChunk = async () => {
      // chunk size 만큼 데이터 분할
      console.log(file.name);
      const start = currentChunk * chunkSize;
      const end = Math.min(start + chunkSize, file.size);

      const chunk = file.slice(start, end);
      console.log(chunk);
      // form data 형식으로 전송
      const formData = new FormData();
      const info = {
        targetDirectoryPath: absolutePath,
        fileName: file.name.split('.')[0],
        totalChunkCount: file.size,
        currChunkIndex: start === 0 ? 0 : start + 1,
        isLast: totalChunks - 1 === currentChunk,
        extension: '.txt',
      };
      formData.append('media', chunk);
      formData.append(
        'info',
        new Blob([JSON.stringify(info)], { type: 'application/json' }),
      );

      try {
        const response = await enrollVideo(formData);
        console.log(response);
        if (response.status === 201) {
          setIsVideoUploadingModalOpen(false);
          alert('파일 전송이 끝났습니다');

          try {
            const { data } = await getDirectory(absolutePath);
            setDirectoryDatas(data);
          } catch (e) {
            console.log(e);
          }
        } else if (response.status === 202) {
          currentChunk += 1;
          setUploadingInfo((prev) => ({
            ...prev,
            current: currentChunk,
          }));
          sendNextChunk();
        }
      } catch (e) {
        if (e.response && e.response.status === 406) {
          console.log('406 Not Acceptable 에러 발생:', e.response.data);
          // 서버로부터 chunkIndex를 받아옴
          const { nextChunkIndex } = e.response.data;
          console.log(nextChunkIndex);
          currentChunk = ((nextChunkIndex - 1) / 1024) * 1024;
          setUploadingInfo((prev) => ({
            ...prev,
            current: currentChunk,
          }));
          sendNextChunk();
        } else {
          console.log('알 수 없는 에러:', e);
          alert('영상 업로드에 실패 하였습니다.');
          setIsVideoUploadingModalOpen(false);
        }
      }
    };

    sendNextChunk();
  };
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
      <VideoUploadingModal
        modalOpen={isVideoUploadingModalOpen}
        setModalOpen={setIsVideoUploadingModalOpen}
        uploadingInfo={uploadingInfo}
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
          <label htmlFor="vedioUpload">
            <TextButton
              color="gray"
              moreStyle="w-[9rem]"
              handleClick={() => {
                videoRef.current.click();
              }}
            >
              영상 업로드
            </TextButton>
            <input
              id="vedioUpload"
              ref={videoRef}
              type="file"
              accept="video/mp4"
              capture="environment"
              className="hidden"
              onChange={handleEnrollVideo}
            />
          </label>
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
              return (
                <VideoFile
                  key={data.createdTime}
                  name={data.fileName}
                  setCheckedDirectoryArr={setCheckedDirectoryArr}
                  index={index}
                  path={data.path}
                />
              );
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
