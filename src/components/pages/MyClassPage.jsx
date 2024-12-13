import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getOwnCourses } from '../../apis/course';
import { getLessonsByClassId } from '../../apis/lesson';
import DateSelector from '../molecules/DateSelector';
import CategoryDropdown from '../molecules/CategoryDropdown';
import LessonList from '../organisms/LessonList';
import Pagenation from '../organisms/Pagenation';
import DropdownMenu from '../molecules/DropdownMenu';
import { getOwnOnlineCourses } from '../../apis/onlineCourse';
import OnlineLessonList from '../organisms/OnlineLessonList';

// const lessons = [
//   {
//     date: '24.09.17',
//     title: '수학(상) 곱셈정리를',
//   },

//   {
//     date: '24.09.17',
//     title: '수학(상) 곱셈정리를 이용한 인수분해 ',
//   },

//   {
//     date: '24.09.17',
//     title: '수학(상) 곱셈정리를 이용한 인수분해',
//   },
// ];

const categoryData = ['날짜', '이름'];

function MyClassPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [courseList, setCourseList] = useState([]);
  const [selectedClassindex, setSelectedClassindex] = useState(
    searchParams.get('classIndex'),
  );
  const [selectedCategoryindex, setSelectedCategoryindex] = useState(
    searchParams.get('sortIndex'),
  );
  const [startDate, setStartDate] = useState();
  const [lessons, setLessons] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({
    totalItemSize: 0,
    currentPage: 0,
    pageSize: 8,
  });
  const [courseType, setCourseType] = useState('offline');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const offlienCourseResponse = await getOwnCourses();
        const onlineCourseResponse = await getOwnOnlineCourses();
        setCourseList([
          ...offlienCourseResponse.data.map((course) => ({
            ...course,
            type: 'offline',
          })),
          ...onlineCourseResponse.data.map((course) => ({
            ...course,
            type: 'online',
          })),
        ]);

        if (offlienCourseResponse.data.length === 0) setCourseType('online');
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (courseList.length > 0) {
        try {
          const { data } = await getLessonsByClassId(
            courseList[selectedClassindex].courseId,
            selectedCategoryindex,
            page - 1,
          );
          setLessons(data.data);
          setPageInfo(data.pageInfo);
        } catch (e) {
          console.log(e);
        }
      }
    };
    fetchData();
  }, [selectedClassindex, selectedCategoryindex, courseList, page]);

  useEffect(() => {
    if (courseList[selectedClassindex]?.type === 'offline')
      setCourseType('offline');

    if (courseList[selectedClassindex]?.type === 'online')
      setCourseType('online');
  }, [selectedClassindex]);

  console.log(courseList);
  if (courseList.length === 0)
    return (
      <div className="flex items-center justify-center h-[calc(100vh-157px)] bg-gray-100">
        <div className="p-8 bg-white shadow-xl rounded-2xl border border-gray-200 mb-36">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            수업 등록을 해주세요
          </h1>
          <p className="text-gray-600 text-center">
            아래 버튼을 눌러 수업을 등록하세요.
          </p>
          <div className="mt-6 flex justify-center">
            <button
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
              type="button"
              onClick={() => {
                navigate('/lesson-overview');
              }}
            >
              등록하기
            </button>
          </div>
        </div>
      </div>
    );
  return (
    <div>
      <div className="flex justify-center mt-2">
        <DropdownMenu
          type="search"
          size="long"
          textArr={courseList.map((course) => course.courseName)}
          selectedIndex={selectedClassindex}
          setSelectedIndex={setSelectedClassindex}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </div>
      {courseType === 'offline' && (
        <div className="relative flex justify-center mt-[12px]">
          <div className="mr-4">
            <DateSelector
              startDate={startDate}
              setStartDate={setStartDate}
              courseList={courseList}
              selectedClassindex={selectedClassindex}
            />
          </div>
          <div className="ml-4">
            <CategoryDropdown
              textArr={categoryData}
              selectedIndex={selectedCategoryindex}
              setSelectedIndex={setSelectedCategoryindex}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          </div>
        </div>
      )}
      {courseType === 'offline' && (
        <LessonList
          lessons={lessons}
          courseList={courseList}
          selectedClassindex={selectedClassindex}
        />
      )}
      {courseType === 'online' && (
        <OnlineLessonList
          lessons={[
            {
              title: '수학(상) 곱셈정리를 이용한 인수분해 정리 1강',
              runtime: '35:00',
              alreadyView: true,
            },
            {
              title: '수학(상) 곱셈정리를 이용한 인수분해 정리 1강',
              runtime: '35:00',
              alreadyView: false,
            },
          ]}
          lessonInformation={{
            teacherName: '하경현',
            lessoneRange: '집합과 명제, 함수, 수와 연산, 기본 도형과 논리',
            lessonDesc:
              '수학(상) 수업은 수학의 기초 개념을 다루며, 고등학교 수학 학습의 토대를 마련하는 중요한 내용으로 구성되어 있습니다. 먼저, 집합과 명제 부분에서는 집합의 개념과 표현 방법, 그리고 집합의 연산을 배우며, 명제와 논리 연산을 이해합니다.이를 통해 조건명제와 대우의 개념을 익히고 기본적인 논리적 사고를 키울 수 있습니다.',
          }}
          courseList={courseList}
          selectedClassindex={selectedClassindex}
        />
      )}

      <div className="w-[360px] mx-auto my-1">
        <Pagenation
          page={page}
          setPage={setPage}
          totalItemNumbers={pageInfo?.totalItemSize}
          itemNumPerPage={8}
        />
      </div>
    </div>
  );
}

export default MyClassPage;
