import { useEffect, useState } from 'react';
import { AiOutlineSmile, AiFillEdit } from 'react-icons/ai';
import IconButton from '../atoms/IconButton';
import OnlineClassList from '../organisms/OnlineCourseList';
import OnlineCourseEnrollmentModal from '../modals/OnlineCourseEnrollmentModal';
import {
  deleteOnlineCourses,
  getAllOnlineCourses,
  getOnlineCoursesById,
} from '../../apis/onlineCourse';
import getAllTeachers from '../../apis/teacher';
import TeacherDropdown from '../molecules/TeacherDropdown';
import DeleteCheckModal from '../modals/DeleteCheckModal';
import ErrorConfirmModal from '../modals/ErrorConfirmModal';
import { useOnlineCourseStudentStore } from '../../store/onluneCourseStudentsStore';
import { getAllStudents } from '../../apis/student';

function OnlineCourseManagementPage() {
  const { setEntireStudents } = useOnlineCourseStudentStore();
  const [enrollmentModalOpen, setEnrollmentModalOpen] = useState(false);
  const [teacherArr, setTeacherArr] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [courseListData, setCourseListData] = useState(null);
  const [deletedCoursesIndex, setDeletedCoursesIndex] = useState([]);
  const [deleteCheckModalOpen, setDeleteCheckModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  useEffect(() => {
    // 비동기 함수 정의
    const fetchData = async () => {
      try {
        const { data } = await getAllTeachers();

        setTeacherArr(data);

        if (teacherArr.length === 0 || selectedIndex === 0) {
          getAllOnlineCourses(setCourseListData);
        } else {
          getOnlineCoursesById(
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

  return (
    <div className="w-full text-center">
      <OnlineCourseEnrollmentModal
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
              await deleteOnlineCourses(deletedCoursesIndex[i]);
            await getAllOnlineCourses(setCourseListData);
            setDeleteCheckModalOpen(false);
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
        <OnlineClassList
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

export default OnlineCourseManagementPage;
