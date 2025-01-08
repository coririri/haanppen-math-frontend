import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CourseType } from '../../types/courseType';
import { OfflineLessonType } from '../../types/offlineLessonType';

interface LessonListProps {
  lessons: OfflineLessonType[];
  courseList: CourseType[];
  selectedClassindex: number;
}

function LessonList({
  lessons,
  courseList,
  selectedClassindex,
}: LessonListProps) {
  const navigate = useNavigate();

  return (
    <div className="w-[330px] mx-auto mt-[-8px]">
      <div className="flex bg-[#D9D9D9] py-2">
        <span className="block w-[100px] text-center font-bold text-md">
          수업 날짜
        </span>
        <span className="block w-[230px]  text-center font-bold text-md">
          강의명
        </span>
      </div>
      {lessons.map((lesson) => (
        <div
          className="flex items-center border-[#D9D9D9] border-b-2 border-solid py-4"
          key={lesson.memoId}
        >
          <span className="block w-[100px] text-center font-bold text-md">
            {lesson.targetDate.substring(2)}
          </span>
          <button
            type="button"
            className="mr-2"
            onClick={() => {
              navigate(
                `/lesson?date=${lesson.targetDate}&courseId=${courseList[selectedClassindex].courseId}&courseName=${courseList[selectedClassindex].courseName}`,
              );
            }}
          >
            <span className="block w-[230px]  text-center font-bold text-md border-hpLightBlue border-[1.5px] border-solid text-hpLightBlue rounded-xl">
              {lesson.progressed}
            </span>
          </button>
        </div>
      ))}

      {Array(8 - lessons.length)
        .fill(0)
        .map((value, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div className="flex py-4 h-[60px]" key={index}>
            <span className="block w-[100px] text-center font-bold text-md">
              {}
            </span>
            <button type="button">
              <span className="block w-[280px]  text-center font-bold text-md  text-hpLightBlue rounded-xl">
                {}
              </span>
            </button>
          </div>
        ))}
    </div>
  );
}

export default LessonList;
