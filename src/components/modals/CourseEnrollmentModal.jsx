import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { AiFillEdit } from 'react-icons/ai';
import IconButton from '../atoms/IconButton';
import StudentListByClass from '../organisms/StudentListByClass';
import enrollCourse, { getAllCourses, getCoursesById } from '../../apis/course';
import getAllTeachers from '../../apis/teacher';
import { getAllStudents } from '../../apis/student';
import DropdownMenu from '../molecules/DropdownMenu';

/* overlay는 모달 창 바깥 부분을 처리하는 부분이고,
content는 모달 창부분이라고 생각하면 쉬울 것이다 */
const customModalStyles = {
  overlay: {
    backgroundColor: ' rgba(0, 0, 0, 0.4)',
    width: '100%',
    height: '100vh',
    zIndex: '10',
    position: 'fixed',
    top: '0',
    left: '0',
  },
  content: {
    width: '750px',
    height: '800px',
    zIndex: '150',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
    boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
    backgroundColor: 'white',
    justifyContent: 'center',
    overflow: 'auto',
  },
};

function CourseEnrollmentModal({
  enrollmentModalOpen,
  setEnrollmentModalOpen,
  setCourseListData,
  teacherArr,
  selectedIndex,
}) {
  const [teacherList, setTeacherList] = useState([]);
  const [selectedTeacherindex, setSelectedTeacherindexIndex] = useState(0);
  const [courseName, setCourseName] = useState('');
  const [entireStudentsNum, setEntireStudentsNum] = useState(0);
  const [differentStudentsNum, setDifferentStudentsNum] = useState(0);
  const [myStudentsNum, setMyStudentsNum] = useState(0);
  const [myCourseStudents, setMyCourseStudents] = useState([
    {
      grade: 0,
      students: [],
    },
    {
      grade: 1,
      students: [],
    },
    {
      grade: 2,
      students: [],
    },
    {
      grade: 3,
      students: [],
    },
    {
      grade: 4,
      students: [],
    },
    {
      grade: 5,
      students: [],
    },
    {
      grade: 6,
      students: [],
    },
    {
      grade: 7,
      students: [],
    },
    {
      grade: 8,
      students: [],
    },
    {
      grade: 9,
      students: [],
    },
    {
      grade: 10,
      students: [],
    },
    {
      grade: 11,
      students: [],
    },
  ]);

  const [entireStudents, setEntireStudents] = useState([
    {
      grade: 0,
      students: [],
    },
    {
      grade: 1,
      students: [],
    },
    {
      grade: 2,
      students: [],
    },
    {
      grade: 3,
      students: [],
    },
    {
      grade: 4,
      students: [],
    },
    {
      grade: 5,
      students: [],
    },
    {
      grade: 6,
      students: [],
    },
    {
      grade: 7,
      students: [],
    },
    {
      grade: 8,
      students: [],
    },
    {
      grade: 9,
      students: [],
    },
    {
      grade: 10,
      students: [],
    },
    {
      grade: 11,
      students: [],
    },
  ]);

  const [differntCourseStudents, setDifferntCourseStudents] = useState([
    {
      grade: 0,
      students: [],
    },
    {
      grade: 1,
      students: [],
    },
    {
      grade: 2,
      students: [],
    },
    {
      grade: 3,
      students: [],
    },
    {
      grade: 4,
      students: [],
    },
    {
      grade: 5,
      students: [],
    },
    {
      grade: 6,
      students: [],
    },
    {
      grade: 7,
      students: [],
    },
    {
      grade: 8,
      students: [],
    },
    {
      grade: 9,
      students: [],
    },
    {
      grade: 10,
      students: [],
    },
    {
      grade: 11,
      students: [],
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getAllTeachers();
        console.log(data);
        setTeacherList([...data]);
        getAllStudents(setEntireStudents, setEntireStudentsNum);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setDifferntCourseStudents(entireStudents);
    setDifferentStudentsNum(entireStudentsNum);
  }, [entireStudents, entireStudentsNum]);

  const resetModalState = () => {
    setSelectedTeacherindexIndex(0);
    setCourseName('');
    setMyStudentsNum(0);
    setMyCourseStudents([
      {
        grade: 0,
        students: [],
      },
      {
        grade: 1,
        students: [],
      },
      {
        grade: 2,
        students: [],
      },
      {
        grade: 3,
        students: [],
      },
      {
        grade: 4,
        students: [],
      },
      {
        grade: 5,
        students: [],
      },
      {
        grade: 6,
        students: [],
      },
      {
        grade: 7,
        students: [],
      },
      {
        grade: 8,
        students: [],
      },
      {
        grade: 9,
        students: [],
      },
      {
        grade: 10,
        students: [],
      },
      {
        grade: 11,
        students: [],
      },
    ]);

    getAllStudents(setEntireStudents, setEntireStudentsNum);
    if (teacherArr.length === 0 || selectedIndex === 0) {
      getAllCourses(setCourseListData);
    } else {
      getCoursesById(teacherArr[selectedIndex - 1].id, setCourseListData);
    }
  };

  console.log(teacherList);
  console.log(selectedTeacherindex);

  return (
    <ReactModal
      isOpen={enrollmentModalOpen}
      onRequestClose={setEnrollmentModalOpen}
      style={customModalStyles}
    >
      <div className="flex flex-col w-full">
        <h1 className="w-full font-bold text-3xl text-center mt-2">반 등록</h1>
        <div className="flex items-center w-full justify-center mt-5">
          <div className="flex items-center mr-8">
            <label
              className="font-bold text-xl w-[70px] mr-2"
              htmlFor="classModalName"
            >
              반 이름
            </label>
            <input
              type="text"
              className="w-[180px] h-[40px] border-solid border-black border-[1.3px] rounded-md pl-2 text-sm font-bold"
              id="classModalName"
              placeholder="이름을 입력해주세요."
              onChange={(e) => {
                setCourseName(e.target.value);
              }}
            />
          </div>
          <div className="ml-8">
            <DropdownMenu
              textArr={[
                '선택 없음',
                ...teacherList.map((teacher) => teacher.name),
              ]}
              selectedIndex={selectedTeacherindex}
              setSelectedIndex={setSelectedTeacherindexIndex}
            />
          </div>
        </div>
        <hr className="h-[1px] border-0 bg-hpGray w-[600px] mx-auto mt-5" />
        <div className="flex justify-center mt-4">
          <div className="mr-4 w-[280px]">
            <div className="flex items-center border-[1.1px] border-solid border-hpGray mb-3 mx-auto w-[180px]">
              <span className="w-[142px] text-center font-bold text-lg">
                전체 학생
              </span>
              <div className="bg-hpGray w-[45px] h-[38px] leading-[38px] font-bold text-center">
                {differentStudentsNum}명
              </div>
            </div>
            <StudentListByClass
              type="entire"
              differntCourseStudents={differntCourseStudents}
              myCourseStudents={myCourseStudents}
              setDifferntCourseStudents={setDifferntCourseStudents}
              setMyCourseStudents={setMyCourseStudents}
              setMyStudentsNum={setMyStudentsNum}
              setDifferentStudentsNum={setDifferentStudentsNum}
            />
          </div>
          <div className="ml-4 w-[280px]">
            <div className="flex items-center border-[1.1px] border-solid border-hpGray mb-3 mx-auto w-[180px]">
              <span className="w-[142px] text-center font-bold text-lg">
                선택 된 학생
              </span>
              <div className="bg-hpGray w-[45px] h-[38px] leading-[38px] font-bold text-center">
                {myStudentsNum}명
              </div>
            </div>
            <StudentListByClass
              type="selected"
              differntCourseStudents={differntCourseStudents}
              myCourseStudents={myCourseStudents}
              setDifferntCourseStudents={setDifferntCourseStudents}
              setMyCourseStudents={setMyCourseStudents}
              setMyStudentsNum={setMyStudentsNum}
              setDifferentStudentsNum={setDifferentStudentsNum}
            />
          </div>
        </div>
        <div className="flex w-full justify-center mt-6">
          <div className="mr-4">
            <IconButton
              bgColor="white"
              icon={<AiFillEdit size="20px" />}
              text="완료"
              handleClick={async () => {
                const tempMyCourseStudents = myCourseStudents.filter(
                  (grade) => grade.students.length !== 0,
                );
                const newCourseStudents = [];
                tempMyCourseStudents.forEach((grade) => {
                  grade.students.forEach((student) => {
                    newCourseStudents.push(student.id);
                  });
                });
                if (selectedTeacherindex === 0) {
                  alert('선생님을 선택해주세요');
                  return;
                }
                await enrollCourse(
                  courseName,
                  teacherList[selectedTeacherindex - 1].id,
                  newCourseStudents,
                );

                await resetModalState();
                setEnrollmentModalOpen(false);
              }}
            />
          </div>
          <div className="ml-4">
            <IconButton
              bgColor="white"
              icon={<AiFillEdit size="20px" />}
              text="취소"
              handleClick={() => {
                resetModalState();
                setEnrollmentModalOpen(false);
              }}
            />
          </div>
        </div>
      </div>
    </ReactModal>
  );
}

export default CourseEnrollmentModal;
