import { useEffect, useState } from 'react';
import { AiOutlineSmile, AiFillEdit } from 'react-icons/ai';
import IconButton from '../atoms/IconButton';
import ClassList from '../organisms/CourseList';
import CourseEnrollmentModal from '../modals/CourseEnrollmentModal';
import {
  deleteCourses,
  getAllCourses,
  getCoursesById,
} from '../../apis/course';
import getAllTeachers from '../../apis/teacher';
import TeacherDropdown from '../molecules/TeacherDropdown';
import DeleteCheckModal from '../modals/DeleteCheckModal';
import ErrorConfirmModal from '../modals/ErrorConfirmModal';
import { getAllStudents } from '../../apis/student';
import { useCourseStudentStore } from '../../store/courseStudentsStore';
import { TeacherType } from '../../types/teacherType';
import { CourseType } from '../../types/courseType';

function OfflineCourseManagementPage() {
  const { setEntireStudents } = useCourseStudentStore();

  const [enrollmentModalOpen, setEnrollmentModalOpen] =
    useState<boolean>(false);
  const [teacherArr, setTeacherArr] = useState<TeacherType[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [courseListData, setCourseListData] = useState<CourseType[]>([]);
  const [deletedCoursesIndex, setDeletedCoursesIndex] = useState<number[]>([]);
  const [deleteCheckModalOpen, setDeleteCheckModalOpen] =
    useState<boolean>(false);
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // 비동기 함수 정의
    const fetchData = async () => {
      try {
        const { data } = await getAllTeachers();

        setTeacherArr(data);

        if (teacherArr.length === 0 || selectedIndex === 0) {
          await getAllCourses(setCourseListData);
        } else {
          await getCoursesById(
            teacherArr[selectedIndex - 1].id,
            setCourseListData,
          );
        }

        const studentResponse = await getAllStudents();
        setEntireStudents(studentResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // 비동기 함수 호출
    fetchData();
  }, [selectedIndex]);
  console.log(deletedCoursesIndex);
  return (
    <div className="w-full text-center">
      <CourseEnrollmentModal
        enrollmentModalOpen={enrollmentModalOpen}
        setEnrollmentModalOpen={setEnrollmentModalOpen}
        setCourseListData={setCourseListData}
        teacherArr={teacherArr}
        selectedIndex={selectedIndex}
      />
      <DeleteCheckModal
        deleteCheckModalOpen={deleteCheckModalOpen}
        setDeleteCheckModalOpen={setDeleteCheckModalOpen}
        handleDelete={async () => {
          try {
            for (let i = 0; i < deletedCoursesIndex.length; i += 1)
              await deleteCourses(deletedCoursesIndex[i]);
            await getAllCourses(setCourseListData);
            setDeleteCheckModalOpen(false);
            setDeletedCoursesIndex([]);
          } catch (e) {
            setDeleteCheckModalOpen(false);
            setErrorModalOpen(true);
          }
        }}
      />
      <ErrorConfirmModal
        errorModalOpen={errorModalOpen}
        setErrorModalOpen={setErrorModalOpen}
        errorMessage="선생님은 본인 반만 삭제 가능합니다."
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
              handleClick={() => {
                setDeleteCheckModalOpen(true);
              }}
            />
          </div>
        </div>
        <div>
          <div className="relative inline-block">
            <TeacherDropdown
              textArr={[
                '선택 없음',
                ...teacherArr.map((teacher) => teacher.name),
              ]}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
            />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <ClassList
          courseListData={courseListData}
          setDeletedCoursesIndex={setDeletedCoursesIndex}
          setCourseListData={setCourseListData}
          teacherArr={teacherArr}
          selectedIndex={selectedIndex}
        />
      </div>
    </div>
  );
}

export default OfflineCourseManagementPage;
