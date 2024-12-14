import React, { useEffect, useState } from 'react';
import TypeDropdownMenu from '../molecules/TypeDropdownMenu';
import getAllTeachers from '../../apis/teacher';
import LessonSummary from '../molecules/LessonSummary';
import {
  getOnlineCourseByCategoryId,
  getRootCategory,
  getSubCategory,
} from '../../apis/onlineLesson';

function LessonOverviewPage() {
  const [teacherList, setTeacherList] = useState([]);
  const [selectedTeacherindex, setSelectedTeacherindex] = useState(0);
  const [mainCategorySelected, setMainCategorySelected] = useState(0);
  const [subCategorySelected, setSubCategorySelected] = useState(0);
  const [mainCategorys, setMainCategorys] = useState([]);
  const [subCategorys, setSubCategorys] = useState([]);
  const [lessonOverviewDatas, setLessonOverviewDatas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getAllTeachers();
        setTeacherList([...data]);
        const mainCategorysResponse = await getRootCategory();
        setMainCategorys(mainCategorysResponse.data);
        if (mainCategorysResponse.data.length === 0) setSubCategorys([]);
        else {
          const subategorysResponse = await getSubCategory(
            mainCategorysResponse.data[0].categoryId,
          );
          setSubCategorys(subategorysResponse.data);
          if (subategorysResponse.data.length > 0) {
            const categoryOnlineCourse = await getOnlineCourseByCategoryId(
              subategorysResponse.data[subCategorySelected].categoryId,
            );
            setLessonOverviewDatas(categoryOnlineCourse.data);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subategorysResponse = await getSubCategory(
          mainCategorys[mainCategorySelected]?.categoryId,
        );
        setSubCategorys(subategorysResponse.data);

        if (subCategorys[subCategorySelected]?.categoryId !== undefined) {
          try {
            const { data } = await getOnlineCourseByCategoryId(
              subategorysResponse.data[subCategorySelected].categoryId,
            );
            setLessonOverviewDatas(data);
            console.log(data);
          } catch (e) {
            console.log(e);
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [mainCategorySelected]);

  useEffect(() => {
    const fetchData = async () => {
      console.log(subCategorys[subCategorySelected]?.categoryId !== undefined);
      if (subCategorys[subCategorySelected]?.categoryId !== undefined) {
        try {
          const { data } = await getOnlineCourseByCategoryId(
            subCategorys[subCategorySelected].categoryId,
          );
          setLessonOverviewDatas(data);
          console.log(data);
        } catch (e) {
          console.log(e);
        }
      }
    };
    fetchData();
  }, [selectedTeacherindex, mainCategorySelected, subCategorySelected]);
  console.log(teacherList?.[selectedTeacherindex - 1]?.name);
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
                textArr={mainCategorys.map((category) => category.categoryName)}
                selectedIndex={mainCategorySelected}
                setSelectedIndex={setMainCategorySelected}
                size="medium"
              />
            </div>
            <TypeDropdownMenu
              textArr={subCategorys.map((category) => category.categoryName)}
              selectedIndex={subCategorySelected}
              setSelectedIndex={setSubCategorySelected}
              size="long"
            />
          </div>
          <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-center mt-16 gap-20">
            {selectedTeacherindex !== 0
              ? lessonOverviewDatas
                  .filter(
                    (lessonOverviewData) =>
                      lessonOverviewData.teacherPreview.teacherName ===
                      teacherList?.[selectedTeacherindex - 1]?.name,
                  )
                  .map((lessonOverviewData) => (
                    <LessonSummary
                      lessonOverviewData={lessonOverviewData}
                      mainCategoryName={
                        mainCategorys[mainCategorySelected].categoryName
                      }
                    />
                  ))
              : lessonOverviewDatas.map((lessonOverviewData) => (
                  <LessonSummary
                    lessonOverviewData={lessonOverviewData}
                    mainCategoryName={
                      mainCategorys[mainCategorySelected].categoryName
                    }
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LessonOverviewPage;
