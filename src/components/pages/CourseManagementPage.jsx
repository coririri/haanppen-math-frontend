import { useEffect, useState } from 'react';
import { AiOutlineSmile, AiFillEdit } from 'react-icons/ai';
import IconButton from '../atoms/IconButton';
import DropdownMenu from '../molecules/DropdownMenu';
import ClassList from '../organisms/CourseList';
import CourseEnrollmentModal from '../modals/CourseEnrollmentModal';
import { deleteCourses, getAllCourses } from '../../apis/course';

function CourseManagementPage() {
  const [enrollmentModalOpen, setEnrollmentModalOpen] = useState(false);
  const [teacherArr] = useState(['선생님 전체', '권나희', '하경현']);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [courseListData, setCourseListData] = useState(null);
  const [deletedCoursesIndex, setDeletedCoursesIndex] = useState([]);

  useEffect(() => {
    getAllCourses(setCourseListData);
  }, []);

  return (
    <div className="w-full text-center">
      <CourseEnrollmentModal
        enrollmentModalOpen={enrollmentModalOpen}
        setEnrollmentModalOpen={setEnrollmentModalOpen}
        setCourseListData={setCourseListData}
      />
      <hr className="h-[1px] border-0 bg-hpGray w-[700px] mx-auto mt-2" />
      <div className="flex items-center  w-[550px] mx-auto justify-between mt-4">
        <div className="flex items-center">
          <div className="mr-6">
            <IconButton
              bgColor="blue"
              icon={<AiOutlineSmile size="26px" color="white" />}
              text="반 등록"
              handleClick={() => {
                setEnrollmentModalOpen(true);
              }}
            />
          </div>
          <div>
            <IconButton
              bgColor="white"
              icon={<AiFillEdit size="26px" color="black" />}
              text="반 삭제"
              handleClick={async () => {
                for (let i = 0; i < deletedCoursesIndex.length; i += 1)
                  await deleteCourses(deletedCoursesIndex[i]);
                await getAllCourses(setCourseListData);
              }}
            />
          </div>
        </div>
        <div>
          <div className="relative inline-block">
            <DropdownMenu
              size="normal"
              textArr={teacherArr}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              isOpen={isDropdownOpen}
              handleClick={() => {
                setIsDropdownOpen((prev) => !prev);
              }}
            />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <ClassList
          courseListData={courseListData}
          setDeletedCoursesIndex={setDeletedCoursesIndex}
          setCourseListData={setCourseListData}
        />
      </div>
    </div>
  );
}

export default CourseManagementPage;
