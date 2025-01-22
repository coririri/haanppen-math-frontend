import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getOwnCourses } from '../../apis/course';
import { getLessonsByClassId } from '../../apis/lesson';
import DateSelector from '../molecules/DateSelector';
import CategoryDropdown from '../molecules/CategoryDropdown';
import LessonList from '../organisms/LessonList';
import Pagenation from '../organisms/Pagenation';
import DropdownMenu from '../molecules/DropdownMenu';
import { getOwnOnlineCourses } from '../../apis/onlineCourse';
import OnlineLessonList from '../organisms/OnlineLessonList';
import { CourseType } from '../../types/courseType';
import { PageInfoType } from '../../types/page';
import { OfflineLessonType } from '../../types/offlineLessonType';

const categoryData = ['날짜', '이름'];

function MyClassPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [courseList, setCourseList] = useState<CourseType[]>([]);
  const [selectedClassindex, setSelectedClassindex] = useState<number>(
    Number(searchParams.get('classIndex')),
  );
  const [selectedCategoryindex, setSelectedCategoryindex] = useState<number>(
    Number(searchParams.get('sortIndex')),
  );
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [lessons, setLessons] = useState<OfflineLessonType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageInfo, setPageInfo] = useState<PageInfoType>({
    totalItemSize: 0,
    currentPage: 0,
    pageSize: 8,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const offlienCourseResponse = await getOwnCourses();
        const onlineCourseResponse = await getOwnOnlineCourses();
        setCourseList([
          ...offlienCourseResponse.data.map((course: CourseType) => ({
            ...course,
            type: 'offline',
          })),
          ...onlineCourseResponse.data.map((course: CourseType) => ({
            ...course,
            type: 'online',
          })),
        ]);

        if (offlienCourseResponse.data.length === 0) {
          searchParams.set('courseType', 'offline');
          setSearchParams(searchParams);
        }
        searchParams.set('courseType', 'online');
        setSearchParams(searchParams);
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
          if (courseList[selectedClassindex]?.type === 'offline') {
            const { data } = await getLessonsByClassId(
              courseList[selectedClassindex].courseId,
              selectedCategoryindex,
              page - 1,
            );
            setLessons(data.data);
            setPageInfo(data.pageInfo);
          }
        } catch (e) {
          console.log(e);
        }
      }
    };
    fetchData();
  }, [selectedClassindex, selectedCategoryindex, courseList, page]);

  useEffect(() => {
    console.log(courseList);
    if (courseList[selectedClassindex]?.type === 'offline') {
      searchParams.set('courseType', 'offline');
      setSearchParams(searchParams);
    }

    if (courseList[selectedClassindex]?.type === 'online') {
      searchParams.set('courseType', 'online');
      setSearchParams(searchParams);
    }
  }, [courseList, selectedClassindex]);

  console.log(courseList);
  if (courseList.length === 0)
    return (
      <div className="flex items-center justify-center h-[calc(100vh-157px)] bg-gray-100">
        <div className="p-8 bg-white shadow-xl rounded-2xl border border-gray-200 mb-36">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            등록된 수업이 없습니다.
          </h1>
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
      {searchParams.get('courseType') === 'offline' && (
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
      {searchParams.get('courseType') === 'offline' && (
        <LessonList
          lessons={lessons}
          courseList={courseList}
          selectedClassindex={selectedClassindex}
        />
      )}
      {searchParams.get('courseType') === 'online' && (
        <OnlineLessonList
          teacherName={
            courseList[selectedClassindex].teacherPreview.teacherName
          }
          courseList={courseList}
          selectedClassindex={selectedClassindex}
          onlineCourseId={courseList[selectedClassindex].courseId}
        />
      )}

      {searchParams.get('courseType') === 'offline' && (
        <div className="w-[360px] mx-auto my-1">
          <Pagenation
            page={page}
            setPage={setPage}
            totalItemNumbers={pageInfo?.totalItemSize}
            itemNumPerPage={8}
          />
        </div>
      )}
    </div>
  );
}

export default MyClassPage;
