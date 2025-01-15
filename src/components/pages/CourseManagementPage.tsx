import { useState } from 'react';
import OnlineCourseManagementPage from './OnlineCourseManagementPage';
import OfflineCourseManagementPage from './OfflineCourseManagementPage';
import SlideBar from '../molecules/SlideBar';

function CourseManagementPage() {
  const [classManagementType, setClassManagementType] = useState<boolean[]>([
    true,
    false,
  ]);

  return (
    <div className="w-full text-center">
      <div className="inline-block my-2">
        <SlideBar
          num={2}
          firstText="학원강좌 반"
          secondText="단과강좌 반"
          isClickArr={classManagementType}
          setIsClickArr={setClassManagementType}
          type="course"
        />
      </div>
      {classManagementType[0] && <OfflineCourseManagementPage />}
      {classManagementType[1] && <OnlineCourseManagementPage />}
    </div>
  );
}

export default CourseManagementPage;
