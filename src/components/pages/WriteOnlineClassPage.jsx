import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import DropdownMenu from '../molecules/DropdownMenu';
import { getOwnCourses } from '../../apis/course';

function WriteOnlineClassPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [courseList, setCourseList] = useState([]);
  const [selectedClassindex, setSelectedClassindex] = useState(
    searchParams.get('classIndex'),
  );
  const [isCreated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getOwnCourses();
      setCourseList(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <DropdownMenu
        type="search"
        textArr={courseList.map((course) => course.courseName)}
        selectedIndex={selectedClassindex}
        setSelectedIndex={setSelectedClassindex}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <div className="flex justify-center">
        <div>
          <h3>수업 세부 내용</h3>
          {isCreated ? (
            <button type="button">수업 삭제</button>
          ) : (
            <button type="button">수업 생성</button>
          )}
        </div>
        {isCreated && <div>수업 영상 관리</div>}
      </div>
    </div>
  );
}

export default WriteOnlineClassPage;
