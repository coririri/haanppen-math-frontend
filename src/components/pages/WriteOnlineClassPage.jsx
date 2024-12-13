import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AiFillEdit } from 'react-icons/ai';
import DropdownMenu from '../molecules/DropdownMenu';
import { getOwnOnlineCourses } from '../../apis/onlineCourse';
import IconButton from '../atoms/IconButton';
import OnlinePrimaryForm from '../organisms/OnlinePrimaryForm';
import OnlineVedioManagement from '../organisms/OnlineVedioManagement';
import DeleteCheckModal from '../modals/DeleteCheckModal';
import enrollOnlineLesson, {
  getOnlineLesson,
  getRootCategory,
  getSubCategory,
} from '../../apis/onlineLesson';

function WriteOnlineClassPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [courseList, setCourseList] = useState([]);
  const [selectedClassindex, setSelectedClassindex] = useState(
    searchParams.get('classIndex'),
  );
  const [isCreated, setIsCreated] = useState(false);
  const [primaryClassInfo, setPrimaryClassInfo] = useState({
    title: '',
    lessonRange: '',
    lessonDesc: '',
  });
  const [mainCategorySelected, setMainCategorySelected] = useState(0);
  const [subCategorySelected, setSubCategorySelected] = useState(0);
  const [deleteClassCheckModalOpen, setDeleteClassCheckModalOpen] =
    useState(false);
  const [mainCategorys, setMainCategorys] = useState([]);
  const [subCategorys, setSubCategorys] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const mainCategorysResponse = await getRootCategory();
      let subategorysResponse;

      setMainCategorys(mainCategorysResponse.data);
      if (mainCategorysResponse.data.length === 0) setSubCategorys([]);
      else {
        subategorysResponse = await getSubCategory(
          mainCategorysResponse.data[0].categoryId,
        );
        setSubCategorys(subategorysResponse.data);
      }

      const { data } = await getOwnOnlineCourses();
      setCourseList(data);
      const onlineLessonRespose = await getOnlineLesson(
        data[selectedClassindex].courseId,
      );

      if (onlineLessonRespose.data.title === null) {
        setPrimaryClassInfo({
          title: '',
          lessonRange: '',
          lessonDesc: '',
        });

        setMainCategorySelected(0);
        setSubCategorySelected(0);
        setIsCreated(false);
      } else {
        setPrimaryClassInfo({
          title: onlineLessonRespose.data.title,
          lessonRange: onlineLessonRespose.data.lessonRange,
          lessonDesc: onlineLessonRespose.data.lessonDesc,
        });

        for (let i = 0; i < mainCategorysResponse.data.length; i += 1) {
          if (
            mainCategorysResponse.data[i].categoryName ===
            onlineLessonRespose.data.lessonCategoryInfo.parentCategoryName
          ) {
            setMainCategorySelected(i);
            break;
          }
        }

        for (let i = 0; i < subategorysResponse.data.length; i += 1) {
          if (
            subategorysResponse.data[i].categoryId ===
            onlineLessonRespose.data.lessonCategoryInfo.categoryId
          ) {
            setSubCategorySelected(i);
            break;
          }
        }

        setIsCreated(true);
      }
    };
    fetchData();
  }, [selectedClassindex]);

  return (
    <div>
      <DeleteCheckModal
        deleteCheckModalOpen={deleteClassCheckModalOpen}
        setDeleteCheckModalOpen={setDeleteClassCheckModalOpen}
        handleDelete={async () => {
          setIsCreated(false);
          setDeleteClassCheckModalOpen(false);
        }}
      />
      <DropdownMenu
        type="search"
        size="long"
        textArr={courseList.map((course) => course.courseName)}
        selectedIndex={selectedClassindex}
        setSelectedIndex={setSelectedClassindex}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <div className="flex justify-center">
        <div>
          {!isCreated ? (
            <div className="flex flex-col justify-center items-center">
              <OnlinePrimaryForm
                isCreated={isCreated}
                primaryClassInfo={primaryClassInfo}
                setPrimaryClassInfo={setPrimaryClassInfo}
                mainCategorySelected={mainCategorySelected}
                setMainCategorySelected={setMainCategorySelected}
                subCategorySelected={subCategorySelected}
                setSubCategorySelected={setSubCategorySelected}
                mainCategorys={mainCategorys}
                subCategorys={subCategorys}
              />
            </div>
          ) : (
            <div className="flex justify-center">
              <div>
                <OnlinePrimaryForm
                  isCreated={isCreated}
                  primaryClassInfo={primaryClassInfo}
                  setPrimaryClassInfo={setPrimaryClassInfo}
                  mainCategorySelected={mainCategorySelected}
                  setMainCategorySelected={setMainCategorySelected}
                  subCategorySelected={subCategorySelected}
                  setSubCategorySelected={setSubCategorySelected}
                  mainCategorys={mainCategorys}
                  subCategorys={subCategorys}
                />
              </div>
              <div className="flex flex-col justify-center items-center">
                <div className="w-[10px] h-[600px] bg-gray-200 mx-12 my-6" />
                <IconButton
                  bgColor="white"
                  icon={<AiFillEdit size="20px" />}
                  text="수업 삭제"
                  handleClick={() => {
                    setDeleteClassCheckModalOpen(true);
                  }}
                />
              </div>
              <div>
                <OnlineVedioManagement />
              </div>
            </div>
          )}
          <div className="flex justify-center mb-8">
            {!isCreated && (
              <IconButton
                bgColor="white"
                icon={<AiFillEdit size="20px" />}
                text="수업 생성"
                handleClick={async () => {
                  try {
                    await enrollOnlineLesson(
                      courseList[selectedClassindex].courseId,
                      primaryClassInfo.title,
                      primaryClassInfo.lessonRange,
                      primaryClassInfo.lessonDesc,
                      subCategorys[subCategorySelected].categoryId,
                    );
                    setIsCreated(true);
                  } catch (e) {
                    console.log(e);
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WriteOnlineClassPage;
