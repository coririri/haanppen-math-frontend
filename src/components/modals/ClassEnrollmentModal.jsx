import { useRef, useState } from 'react';
import ReactModal from 'react-modal';
import { AiFillEdit, AiOutlineSearch } from 'react-icons/ai';
import TeacherCarousel from '../molecules/TeacherCarousel';
import IconButton from '../atoms/IconButton';
import StudentListByClass from '../organisms/StudentListByClass';

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
    height: '750px',
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

function ClassEnrollmentModal({ enrollmentModalOpen, setEnrollmentModalOpen }) {
  const [teacherList] = useState(['선택 없음']);
  const [selectedTeacherindex, setSelectedTeacherindexIndex] = useState(0);
  const { searchRef } = useRef();

  const differntCourseStudents = [
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
  ];

  const myCourseStudents = [
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
  ];

  const entireCourse = {
    courseId: 0,
    courseName: '화53',
    studentPreviews: [
      {
        studentId: 0,
        studentName: '조인애',
        grade: 1,
      },
      {
        studentId: 1,
        studentName: '손혜림',
        grade: 1,
      },
      {
        studentId: 2,
        studentName: '김선우',
        grade: 0,
      },
      {
        studentId: 3,
        studentName: '배재윤',
        grade: 2,
      },
      {
        studentId: 4,
        studentName: '최인성',
        grade: 3,
      },
      {
        studentId: 5,
        studentName: '김도용',
        grade: 2,
      },
      {
        studentId: 6,
        studentName: '이경순',
        grade: 0,
      },
    ],
    teacherPreview: {
      teacherName: 'string',
      teacherId: 0,
    },
  };

  const myCourse = {
    courseId: 0,
    courseName: '화53',
    studentPreviews: [
      {
        studentId: 2,
        studentName: '김선우',
        grade: 0,
      },
      {
        studentId: 3,
        studentName: '배재윤',
        grade: 2,
      },
      {
        studentId: 6,
        studentName: '이경순',
        grade: 0,
      },
    ],
    teacherPreview: {
      teacherName: 'string',
      teacherId: 0,
    },
  };

  const entireStudentIds = new Set(
    entireCourse.studentPreviews.map((student) => student.studentId),
  );
  const myStudentIds = new Set(
    myCourse.studentPreviews.map((student) => student.studentId),
  );

  const differenceStudentIds = [...entireStudentIds].filter(
    (studentId) => !myStudentIds.has(studentId),
  );

  const differenceStudents = entireCourse.studentPreviews.filter((student) =>
    differenceStudentIds.includes(student.studentId),
  );

  myCourse.studentPreviews.forEach((student) => {
    myCourseStudents[student.grade].students.push({
      studentId: student.studentId,
      studentName: student.studentName,
      grade: student.grade,
    });
  });

  differenceStudents.forEach((student) => {
    differntCourseStudents[student.grade].students.push({
      studentId: student.studentId,
      studentName: student.studentName,
      grade: student.grade,
    });
  });

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
              onChange={() => {
                console.log('반 이름');
              }}
            />
          </div>
          <div className="ml-8">
            <TeacherCarousel
              teacherList={teacherList}
              selectedTeacherindex={selectedTeacherindex}
              setSelectedTeacherindexIndex={setSelectedTeacherindexIndex}
            />
          </div>
        </div>
        <hr className="h-[1px] border-0 bg-hpGray w-[600px] mx-auto mt-5" />
        <div className="flex justify-center mt-4">
          <div className="mr-4 w-[280px]">
            <div className="relative mb-3 mx-auto w-[180px]">
              <input
                type="text"
                className="w-[180px] h-[36px] leading-[21px] border-[1.3px] border-solid border-black pr-2 pl-4 rounded-sm focus-visible:outline-0 text-lg"
                placeholder="학생 이름 검색"
                ref={searchRef}
              />
              <button
                className="absolute bg-bjsBlue text-md p-1 pl-3 text-white right-0 top-[1px] rounded-r-xl "
                type="button"
                aria-label="학생 검색"
                onClick={() => {
                  console.log('검색');
                }}
              >
                <AiOutlineSearch size="26px" className="mr-2" color="black" />
              </button>
            </div>
            <StudentListByClass
              type="entire"
              differntCourseStudents={differntCourseStudents}
              myCourseStudents={myCourseStudents}
            />
          </div>
          <div className="ml-4 w-[280px]">
            <div className="relative mx-auto mb-3 w-[180px]">
              <input
                type="text"
                className="w-[180px] h-[36px] leading-[21px] border-[1.3px] border-solid border-black pr-2 pl-4 rounded-sm focus-visible:outline-0 text-lg"
                placeholder="학생 이름 검색"
                ref={searchRef}
              />
              <button
                className="absolute bg-bjsBlue text-md p-1 pl-3 text-white right-0 top-[1px] rounded-r-xl "
                type="button"
                aria-label="학생 검색"
                onClick={() => {
                  console.log('검색');
                }}
              >
                <AiOutlineSearch size="26px" className="mr-2" color="black" />
              </button>
            </div>
            <StudentListByClass
              type="selected"
              differntCourseStudents={differntCourseStudents}
              myCourseStudents={myCourseStudents}
            />
          </div>
        </div>
        <div className="flex w-full justify-center mt-6">
          <div className="mr-4">
            <IconButton
              bgColor="white"
              icon={<AiFillEdit size="20px" />}
              text="완료"
              handleClick={() => {
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
                setEnrollmentModalOpen(false);
              }}
            />
          </div>
        </div>
      </div>
    </ReactModal>
  );
}

export default ClassEnrollmentModal;
