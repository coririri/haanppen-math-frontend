import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getLessonByDateAndCourse } from '../../apis/lesson';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function LessonPage() {
  const [searchParams] = useSearchParams();
  const [lessonData, setLessonData] = useState();
  const [videoData, setVideoData] = useState();
  const [hasMemo, setHasMemo] = useState(false);

  useEffect(() => {
    const courseId = searchParams.get('courseId');
    const date = searchParams.get('date');

    const fetchData = async () => {
      try {
        const response = await getLessonByDateAndCourse(courseId, date);
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

  console.log(lessonData);
  console.log(videoData);
  console.log(hasMemo);

  const videoUrl = `${backendUrl}api/media/stream?resourceId=kokain.mp4`;
  return (
    <div>
      <div className="flex justify-center items-center my-4">
        <span className="font-bold text-lg mr-4">
          {searchParams.get('date').substring(2).split('-').join('.')} 수업
        </span>
        <span className="font-bold text-lg ml-4">
          {searchParams.get('courseName')}
        </span>
      </div>
      <div className="w-full h-[1.4px] bg-hpGray" />
      {hasMemo ? (
        <div>
          <div className="px-4 py-2 border-solid border-[1.3px] border-black text-center rounded-lg mx-4 my-4 text-md">
            <span className="font-bold">{lessonData.title}</span>
          </div>
          <div className="text-center">
            <span className="text-lg font-bold">영상 내용</span>
          </div>
          <div className="px-4 py-2 border-solid border-[1.3px] border-black text-center rounded-lg mx-4 mb-4 mt-1 text-xs font-bold">
            {lessonData.desc}
          </div>
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
              <button type="button">
                <span className="mr-4 font-bold">이전 강의</span>
              </button>
              <button type="button">
                <span className="ml-4 font-bold">다음 강의</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>수업 없음</div>
      )}
    </div>
  );
}

export default LessonPage;
