import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getOwnCourses } from '../../apis/course';
import { getLessonsByClassId } from '../../apis/lesson';
import DateSelector from '../molecules/DateSelector';
import CategoryDropdown from '../molecules/CategoryDropdown';
import LessonList from '../organisms/LessonList';
import Pagenation from '../organisms/Pagenation';
import DropdownMenu from '../molecules/DropdownMenu';

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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getOwnCourses();
        setCourseList(data);
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

  return (
    <div>
      <div className="flex justify-center mt-2">
        <DateSelector
          startDate={startDate}
          setStartDate={setStartDate}
          courseList={courseList}
          selectedClassindex={selectedClassindex}
        />
      </div>
      <div className="relative flex justify-center mt-[-12px]">
        <div className="mr-4">
          <DropdownMenu
            type="search"
            textArr={courseList.map((course) => course.courseName)}
            selectedIndex={selectedClassindex}
            setSelectedIndex={setSelectedClassindex}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
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
      <LessonList
        lessons={lessons}
        courseList={courseList}
        selectedClassindex={selectedClassindex}
      />

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
