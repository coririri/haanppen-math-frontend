import React, { useEffect, useState } from 'react';
import TypeDropdownMenu from '../molecules/TypeDropdownMenu';
import getAllTeachers from '../../apis/teacher';
import LessonSummary from '../molecules/LessonSummary';

const mainCategorys = ['초등', '중등', '고등', '고등 (개정)'];
const subCategorys = [
  [
    '1-1',
    '1-2',
    '2-1',
    '2-2',
    '3-1',
    '3-2',
    '4-1',
    '4-2',
    '5-1',
    '5-2',
    '6-1',
    '6-2',
    '기타',
  ],
  ['1-1', '1-2', '2-1', '2-2', '3-1', '3-2', '내신기출', '기타'],
  [
    '수학(상)',
    '수학(하)',
    '수학Ⅰ',
    '수학Ⅱ',
    '확률과통계',
    '미적분',
    '기하',
    '내신기출',
    '모의고사/수능',
    '기타',
  ],
  [
    '공통수학Ⅰ',
    '공통수학Ⅱ',
    '대수',
    '미적분Ⅰ',
    '확률과통계',
    '미적분Ⅱ',
    '기하',
    '내신기출',
    '모의고사/수능',
    '기타',
  ],
];

function LessonOverviewPage() {
  const [teacherList, setTeacherList] = useState([]);
  const [selectedTeacherindex, setSelectedTeacherindex] = useState(0);
  const [mainCategorySelected, setMainCategorySelected] = useState(0);
  const [subCategorySelected, setSubCategorySelected] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getAllTeachers();
        setTeacherList([...data]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full">
      <div className="w-full min-h-screen bg-[#F0F0F0] mx-auto flex flex-col">
        <div className="w-full  mx-auto">
          {/* DropdownMenu */}
          <div className="w-[233px] mx-auto mt-6">
            <div className="flex justify-center gap-2 mb-2">
              <TypeDropdownMenu
                textArr={[
                  '전체',
                  ...teacherList.map((teacher) => teacher.name),
                ]}
                selectedIndex={selectedTeacherindex}
                setSelectedIndex={setSelectedTeacherindex}
                size="small"
              />

              <TypeDropdownMenu
                textArr={mainCategorys}
                selectedIndex={mainCategorySelected}
                setSelectedIndex={setMainCategorySelected}
                size="medium"
              />
            </div>
            <TypeDropdownMenu
              textArr={subCategorys[mainCategorySelected]}
              selectedIndex={subCategorySelected}
              setSelectedIndex={setSubCategorySelected}
              size="long"
            />
          </div>
          <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-center mt-16 gap-20">
            <LessonSummary />
            <LessonSummary />
            <LessonSummary />
            <LessonSummary />
            <LessonSummary />
            <LessonSummary />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LessonOverviewPage;
