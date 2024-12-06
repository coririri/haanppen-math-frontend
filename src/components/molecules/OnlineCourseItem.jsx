import { useState } from 'react';
import TextButton from '../atoms/TextButton';
import OnlineCourseModificationModal from '../modals/OnlineCourseModificationModal';

function OnlineCourseItem({
  className,
  studentNum,
  teacherName,
  courseId,
  setCourseListData,
  setDeletedCoursesIndex,
  teacherArr,
  selectedIndex,
}) {
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
            if (e.target.checked) {
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
