import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getLessonByDateAndCourse } from '../../apis/lesson';
import TextButton from '../atoms/TextButton';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function OnlineLessonPage() {
  const [searchParams] = useSearchParams();
  const [lessonData, setLessonData] = useState();
  const [videoData, setVideoData] = useState([]);
  const [hasMemo, setHasMemo] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    const courseId = searchParams.get('courseId');

    const fetchData = async () => {
      try {
        const response = await getLessonByDateAndCourse(courseId);
        if (response.status === 200) {
          const { data } = response;
          setLessonData({
            memoId: data.memoId,
            title: data.progressed,
            desc: data.homework,
          });
          setVideoData(data.memoMediaViews);
          setHasMemo(true);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (videoData.length > 0)
      setVideoUrl(
        `${backendUrl}api/media/stream?resourceId=${videoData[selectedVideoIndex].mediaSource}`,
      );
  }, [selectedVideoIndex, videoData]);

  // URL을 감지하고 <a> 태그로 변환하는 함수
  const convertToLinks = (text) => {
    // URL 정규식
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    // 텍스트를 분할하고 URL이면 <a> 태그로 변환
    return text.split(urlRegex).map((part) =>
      urlRegex.test(part) ? (
        <a
          href={part}
          key={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {part}
        </a>
      ) : (
        part
      ),
    );
  };

  return (
    <div>
      <div className="flex justify-center items-center my-6 space-x-6 bg-gradient-to-r from-gray-100 to-blue-50 py-3 px-6 rounded-lg shadow-md">
        <span className="font-extrabold text-xl text-gray-900 tracking-wide">
          {searchParams.get('date').substring(2).split('-').join('.')} 수업
        </span>
        <span className="font-extrabold text-xl text-indigo-700 tracking-wide">
          {searchParams.get('courseName')}
        </span>
      </div>
      <div className="w-full h-[1.4px] bg-hpGray" />
      {hasMemo ? (
        <div>
          <div className="text-center mt-3">
            <span className="text-2xl font-bold text-gray-900">영상 제목</span>
          </div>
          <div className="px-6 py-4 border-2 border-gray-700 text-center rounded-xl mx-4 mb-5 mt-1 text-lg bg-gradient-to-r from-blue-100 to-indigo-100 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <span className="font-bold text-gray-900 tracking-wide hover:text-indigo-600 transition-colors duration-300 ease-in-out">
              {lessonData.title}
            </span>
          </div>
          <div className="text-center">
            <span className="text-2xl font-bold text-gray-900">영상 내용</span>
          </div>
          <div className="px-6 py-4 border-2 border-gray-700 text-center rounded-xl mx-4 mb-4 mt-1 text-sm font-medium bg-gradient-to-r from-yellow-50 to-orange-50 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
            {convertToLinks(lessonData.desc)}
          </div>
          {videoData.length !== 0 && (
            <div className="flex flex-col justify-center items-center">
              <video
                src={videoUrl}
                width="360px"
                height="240px"
                autoPlay
                muted
                controls
              />
              <div className="mt-2">
                <button
                  type="button"
                  onClick={() => {
                    if (selectedVideoIndex === 0)
                      setSelectedVideoIndex(videoData.length - 1);
                    else setSelectedVideoIndex(selectedVideoIndex - 1);
                  }}
                  className="relative mr-4  px-3 py-1 bg-green-500 text-white font-bold rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 group"
                >
                  <span className="font-bold">이전 강의</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (videoData.length - 1 === selectedVideoIndex)
                      setSelectedVideoIndex(0);
                    else setSelectedVideoIndex(selectedVideoIndex + 1);
                  }}
                  className="relative ml-4 px-3 py-1 bg-green-500 text-white font-bold rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 group"
                >
                  <span className="font-bold">다음 강의</span>
                </button>
              </div>
              <div className="mt-4">
                {videoData?.[selectedVideoIndex].attachmentViews.map(
                  (attachmentData) => (
                    <div
                      key={attachmentData.attachmentId}
                      className="flex my-2 items-center"
                    >
                      <div className="lg:w-[380px] md:w-[380px] w-[200px] border-solid border-[1.3px] border-hpGray rounded-lg text-left pl-2 mr-2">
                        <span className="font-bold text-md">
                          첨부파일 {selectedVideoIndex}
                        </span>
                      </div>
                      <TextButton
                        color="gray"
                        moreStyle="lg:w-[150px] md:w-[130px] w-[100px] h-[27px] mr-1 ml-2"
                        textMoreStyle="text-sm"
                        handleClick={() => {
                          window.location.href =
                            'https://student.mathflat.com/#/qr?worksheetId=49141506&dateTime=2024-12-11T15:51:42';
                        }}
                      >
                        링크로 이동
                      </TextButton>
                    </div>
                  ),
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>수업 없음</div>
      )}
    </div>
  );
}

export default OnlineLessonPage;
