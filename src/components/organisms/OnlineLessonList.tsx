import React, { useEffect, useState } from 'react';
import { GoTriangleRight, GoTriangleDown } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { getOnlineLesson } from '../../apis/onlineLesson';
import { CourseType } from '../../types/courseType';
import { OnlineVideoDataType } from '../../types/onlineVideoType';
import secondToTime from '../../utils/secondToTime';

// Props 타입 정의
interface OnlineLessonListProps {
  teacherName: string;
  onlineCourseId: number;
  courseList: CourseType[]; // courseList 내 type만 사용 중.
  selectedClassindex: number;
}

function OnlineLessonList({
  teacherName,
  onlineCourseId,
  courseList,
  selectedClassindex,
}: OnlineLessonListProps) {
  const navigate = useNavigate();

  const [isOpenInformation, setIsOpenInformation] = useState(false);
  const [onlineLessonInformation, setOnlineLessonInformation] = useState({
    lessonDesc: '',
    lessonRange: '',
    title: '',
  });
  const [videoList, setVideoList] = useState<OnlineVideoDataType[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (courseList[selectedClassindex]?.type === 'online') {
          const { data } = await getOnlineLesson(onlineCourseId);
          setOnlineLessonInformation(data);
          setVideoList(data.onlineVideoDetails);
          console.log(data);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [onlineCourseId]);

  return (
    <div className="w-[330px] mx-auto mt-[8px]">
      <h2 className="text-xl font-bold my-1 text-center">
        {onlineLessonInformation.title}
      </h2>

      <div className="my-[2px]">
        {/* 버튼 */}
        <button
          type="button"
          className="text-xl font-bold my-1 flex items-center justify-between w-full bg-gray-100 px-4 py-2 rounded shadow hover:bg-gray-200"
          onClick={() => {
            setIsOpenInformation((prev) => !prev);
          }}
        >
          <span>강의 정보</span>
          {!isOpenInformation && <GoTriangleRight size="36px" />}
          {isOpenInformation && <GoTriangleDown size="36px" />}
        </button>

        {/* 여닫는 컨텐츠 */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpenInformation ? 'max-h-[1000px]' : 'max-h-0'
          }`}
        >
          {/* 내용 */}
          <div>
            <div className="flex border-t-[2px] border-b-[1px] border-solid border-t-black border-b-[#C3C3C3]">
              <span className="block w-[80px] text-center font-bold bg-[#EEEEEE] py-[1px]">
                선생님
              </span>
              <span className="block w-[250px] text-left font-bold py-[1px] pl-4">
                {teacherName} 선생님
              </span>
            </div>
            <div className="flex border-t-[1px] border-b-[1px] border-solid border-[#C3C3C3]">
              <span className="flex items-center justify-center w-[80px] text-center font-bold bg-[#EEEEEE] py-[1px]">
                강좌 범위
              </span>
              <span className="block w-[250px] text-left font-bold py-[1px] pl-4">
                {onlineLessonInformation.lessonRange}
              </span>
            </div>
            <div className="flex border-t-[1px] border-b-[1px] border-solid border-[#C3C3C3]">
              <span className="flex items-center justify-center w-[80px] text-center font-bold bg-[#EEEEEE] py-[1px]">
                강좌 설명
              </span>
              <span className="block w-[250px] text-left font-bold py-[1px] pl-4">
                {onlineLessonInformation.lessonDesc}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex bg-[#D9D9D9] py-2">
        <span className="block w-[200px] text-center font-bold text-md">
          강의명
        </span>
        <span className="block w-[50px]  text-center font-bold text-md">
          길이
        </span>
        <span className="block w-[50px]  text-center font-bold text-md" />
      </div>

      {videoList
        .sort((a, b) => a.videoSequence - b.videoSequence)
        .map((lesson) => (
          <div
            className="flex items-center border-[#D9D9D9] border-b-2 border-solid py-4"
            key={lesson.videoId}
          >
            <span className="block w-[200px] text-center font-bold text-md">
              {lesson.mediaName.slice(0, -4)}
            </span>

            <span className="block w-[50px]  text-center font-bold text-md  border-solid text-black rounded-xl">
              {lesson.duration ? secondToTime(lesson.duration) : '00:00:00'}
            </span>

            <button
              type="button"
              onClick={() => {
                navigate(
                  `/online-lesson?onlineCourseId=${onlineCourseId}&videoId=${lesson.videoId}&courseName=${onlineLessonInformation.title}`,
                );
              }}
            >
              <span className="block w-[50px] ml-[25px]  text-center font-bold text-md border-hpLightBlue border-[1.5px] border-solid text-hpLightBlue rounded-xl">
                Play
              </span>
            </button>
          </div>
        ))}
    </div>
  );
}

export default OnlineLessonList;
