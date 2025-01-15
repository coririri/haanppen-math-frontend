import { useState } from 'react';
import TextButton from '../atoms/TextButton';
import OnlineCourseModificationModal from '../modals/OnlineCourseModificationModal';
import { CourseType } from '../../types/courseType';
import { TeacherType } from '../../types/teacherType';

interface OnlineCourseItemProps {
  className: string; // 강좌 이름
  studentNum: number; // 수강생 수
  teacherName: string; // 강사 이름
  courseId: number; // 강좌 ID
  setCourseListData: React.Dispatch<React.SetStateAction<CourseType[]>>; // 강좌 리스트 데이터 업데이트 함수
  setDeletedCoursesIndex: React.Dispatch<React.SetStateAction<number[]>>; // 삭제된 강좌 ID 리스트 업데이트 함수
  teacherArr: TeacherType[]; // 강사 배열
  selectedIndex: number; // 선택된 강사 인덱스
}

function OnlineCourseItem({
  className,
  studentNum,
  teacherName,
  courseId,
  setCourseListData,
  setDeletedCoursesIndex,
  teacherArr,
  selectedIndex,
}: OnlineCourseItemProps) {
  const [isClick, setIsClick] = useState(false);

  return (
    <div>
      <OnlineCourseModificationModal
        enrollmentModalOpen={isClick}
        setEnrollmentModalOpen={setIsClick}
        setCourseListData={setCourseListData}
        courseId={courseId}
        teacherArr={teacherArr}
        selectedIndex={selectedIndex}
      />
      <div className="flex items-center justify-between my-2">
        <input
          type="checkbox"
          className="w-[16px] h-[16px]"
          onClick={(e) => {
            const target = e.target as HTMLInputElement; // 명시적으로 HTMLInputElement로 캐스팅
            if (target.checked) {
              setDeletedCoursesIndex((prev) => [...prev, courseId]);
            } else {
              setDeletedCoursesIndex((prev) =>
                prev.filter((item) => item !== courseId),
              );
            }
          }}
        />
        <span className="text-lg font-bold text-black w-[140px] text-center">
          {className}
        </span>
        <span className="text-lg font-bold text-black w-[90px] text-center">
          {studentNum}
        </span>
        <span className="text-lg font-bold text-black w-[140px]">
          {teacherName}
        </span>
        <div className="w-[100px]">
          <TextButton
            color="gray"
            moreStyle="w-[65px]"
            isClick={isClick}
            handleClick={() => {
              setIsClick((prev) => !prev);
            }}
          >
            상세
          </TextButton>
        </div>
      </div>
      <hr className="h-[0.5px] border-0 bg-hpGray w-[800px] mx-auto mt-2" />
    </div>
  );
}

export default OnlineCourseItem;
