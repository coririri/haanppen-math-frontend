import { useEffect, useState } from 'react';
import TypeDropdownMenu from '../molecules/TypeDropdownMenu';
import LessonSummary from '../molecules/LessonSummary';
import {
  getOnlineCourseByCategoryId,
  getRootCategory,
  getSubCategory,
} from '../../apis/onlineLesson';
import { CategoryType } from '../../types/categoryType';
import { CourseOverviewType } from '../../types/courseType';

function LessonOverviewPage() {
  const [mainCategorySelected, setMainCategorySelected] = useState<number>(1);
  const [subCategorySelected, setSubCategorySelected] = useState<number>(0);
  const [mainCategorys, setMainCategorys] = useState<CategoryType[]>([]);
  const [subCategorys, setSubCategorys] = useState<CategoryType[]>([]);
  const [lessonOverviewDatas, setLessonOverviewDatas] = useState<
    CourseOverviewType[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mainCategorysResponse = await getRootCategory();
        setMainCategorys(mainCategorysResponse.data);
        if (mainCategorysResponse.data.length === 0) setSubCategorys([]);
        else {
          const subategorysResponse = await getSubCategory(
            mainCategorysResponse.data[1].categoryId,
          );
          setSubCategorys(subategorysResponse.data);
          if (subategorysResponse.data.length > 0) {
            if (subCategorySelected === 0) {
              try {
                const onlineCourseByMainCategory =
                  await getOnlineCourseByCategoryId(
                    mainCategorysResponse.data[mainCategorySelected].categoryId,
                  );
                setLessonOverviewDatas(onlineCourseByMainCategory.data);
                return;
              } catch (e) {
                console.log(e);
              }
            }
            const categoryOnlineCourse = await getOnlineCourseByCategoryId(
              subategorysResponse.data[subCategorySelected - 1].categoryId,
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
          if (subCategorySelected === 0) {
            console.log(mainCategorys[mainCategorySelected]);
            try {
              const { data } = await getOnlineCourseByCategoryId(
                mainCategorys[mainCategorySelected].categoryId,
              );
              setLessonOverviewDatas(data);
            } catch (e) {
              console.log(e);
            }
            return;
          }

          try {
            const { data } = await getOnlineCourseByCategoryId(
              subategorysResponse.data[subCategorySelected - 1].categoryId,
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
    if (mainCategorys.length === 0) {
      return;
    }
    fetchData();
  }, [mainCategorySelected]);

  useEffect(() => {
    const fetchData = async () => {
      if (mainCategorys.length === 0) {
        return;
      }
      if (subCategorySelected === 0) {
        console.log(mainCategorys[mainCategorySelected]);
        try {
          const { data } = await getOnlineCourseByCategoryId(
            mainCategorys[mainCategorySelected].categoryId,
          );
          setLessonOverviewDatas(data);
        } catch (e) {
          console.log(e);
        }
        return;
      }

      if (subCategorys[subCategorySelected]?.categoryId !== undefined) {
        try {
          const { data } = await getOnlineCourseByCategoryId(
            subCategorys[subCategorySelected - 1].categoryId,
          );
          setLessonOverviewDatas(data);
        } catch (e) {
          console.log(e);
        }
      }
    };
    fetchData();
  }, [mainCategorySelected, subCategorySelected]);

  return (
    <div className="w-full">
      <div className="w-full min-h-screen mx-auto flex flex-col">
        <div className="w-full  mx-auto">
          {/* DropdownMenu */}
          <div className="w-[233px] mx-auto mt-6">
            <div className="flex justify-center gap-2 mb-2">
              <TypeDropdownMenu
                textArr={mainCategorys.map((category) => category.categoryName)}
                selectedIndex={mainCategorySelected}
                setSelectedIndex={setMainCategorySelected}
                size="medium"
              />
              <TypeDropdownMenu
                textArr={[
                  '전체',
                  ...subCategorys.map((category) => category.categoryName),
                ]}
                selectedIndex={subCategorySelected}
                setSelectedIndex={setSubCategorySelected}
                size="long"
              />
            </div>
          </div>
          <div className="border-t-[1.2px] border-gray-400/40 border-solid w-full mt-4 mb-4" />
          <div className="flex flex-col items-center justify-center gap-20">
            {lessonOverviewDatas.map((lessonOverviewData) => (
              <LessonSummary lessonOverviewData={lessonOverviewData} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LessonOverviewPage;
