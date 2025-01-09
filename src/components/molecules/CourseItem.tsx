import { useState } from 'react';
import TextButton from '../atoms/TextButton';
import CourseModificationModal from '../modals/CourseModificationModal';
import { CourseType } from '../../types/courseType';
import { TeacherType } from '../../types/teacherType';

// CourseItemType에 대해 각 prop에 대한 타입을 명시
interface CourseItemType {
  className: string;
  studentNum: number;
  teacherName: string;
  courseId: number;
  setCourseListData: React.Dispatch<React.SetStateAction<CourseType[]>>; // 데이터 형식에 맞춰 수정 가능
  setDeletedCoursesIndex: React.Dispatch<React.SetStateAction<number[]>>; // courseId에 따라 타입 설정
  teacherArr: TeacherType[];
  selectedIndex: number;
}

function CourseItem({
  className,
  studentNum,
  teacherName,
  courseId,
  setCourseListData,
  setDeletedCoursesIndex,
  teacherArr,
  selectedIndex,
}: CourseItemType) {
  const [isClick, setIsClick] = useState(false);
  return (
    <div>
      <CourseModificationModal
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
            const target = e.target as HTMLInputElement; // 타입 단언으로 HTMLInputElement로 변환
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

export default CourseItem;
