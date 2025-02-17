import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AiFillEdit } from 'react-icons/ai';
import DropdownMenu from '../molecules/DropdownMenu';
import { getOwnOnlineCourses } from '../../apis/onlineCourse';
import IconButton from '../atoms/IconButton';
import OnlinePrimaryForm from '../organisms/OnlinePrimaryForm';
import OnlineVedioManagement from '../organisms/OnlineVedioManagement';
import DeleteCheckModal from '../modals/DeleteCheckModal';
import enrollOnlineLesson, {
  deleteOnlineLesson,
  getOnlineLesson,
  getRootCategory,
  getSubCategory,
} from '../../apis/onlineLesson';
import { CourseType } from '../../types/courseType';
import { CategoryType } from '../../types/categoryType';
import { OnlineVideoDataType } from '../../types/onlineVideoType';
import Loading from '../layouts/Loading';

function WriteOnlineClassPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [courseList, setCourseList] = useState<CourseType[]>([]);
  const [selectedClassindex, setSelectedClassindex] = useState<number>(
    Number(searchParams.get('classIndex')),
  );
  const [isCreated, setIsCreated] = useState<boolean>(false);
  const [primaryClassInfo, setPrimaryClassInfo] = useState<{
    title: string;
    lessonRange: string;
    lessonDesc: string;
  }>({
    title: '',
    lessonRange: '',
    lessonDesc: '',
  });
  const [mainCategorySelected, setMainCategorySelected] = useState<number>(0);
  const [subCategorySelected, setSubCategorySelected] = useState<number>(0);
  const [deleteClassCheckModalOpen, setDeleteClassCheckModalOpen] =
    useState<boolean>(false);
  const [mainCategorys, setMainCategorys] = useState<CategoryType[]>([]);
  const [subCategorys, setSubCategorys] = useState<CategoryType[]>([]);
  const [videoList, setVideoList] = useState<OnlineVideoDataType[]>([]);
  const [deleteCheckArr, setDeleteCheckArr] = useState<boolean[]>(
    Array(videoList.length).fill(false),
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
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
      if (data.length === 0) {
        setIsLoading(false);
        return;
      }
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

        let mainCategoryIndex = 0;
        for (let i = 0; i < mainCategorysResponse.data.length; i += 1) {
          if (
            mainCategorysResponse.data[i].categoryName ===
            onlineLessonRespose.data.lessonCategoryInfo.parentCategoryName
          ) {
            setMainCategorySelected(i);
            mainCategoryIndex = i;
            break;
          }
        }

        subategorysResponse = await getSubCategory(
          mainCategorysResponse.data[mainCategoryIndex].categoryId,
        );
        setSubCategorys(subategorysResponse.data);

        for (let i = 0; i < subategorysResponse.data.length; i += 1) {
          if (
            subategorysResponse.data[i].categoryId ===
            onlineLessonRespose.data.lessonCategoryInfo.categoryId
          ) {
            setSubCategorySelected(i);
            break;
          }
        }

        setVideoList(onlineLessonRespose.data.onlineVideoDetails);
        setIsCreated(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [selectedClassindex, isCreated]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subategorysResponse = await getSubCategory(
          mainCategorys[mainCategorySelected].categoryId,
        );
        setSubCategorys(subategorysResponse.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [mainCategorySelected]);

  if (isLoading) return <Loading />;

  return (
    <div>
      <DeleteCheckModal
        deleteCheckModalOpen={deleteClassCheckModalOpen}
        setDeleteCheckModalOpen={setDeleteClassCheckModalOpen}
        handleDelete={async () => {
          try {
            await deleteOnlineLesson(courseList[selectedClassindex].courseId);
            setIsCreated(false);
            setDeleteClassCheckModalOpen(false);
          } catch (e) {
            console.log(e);
          }
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
                courseList={courseList}
                selectedClassindex={selectedClassindex}
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
                  courseList={courseList}
                  selectedClassindex={selectedClassindex}
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
                <OnlineVedioManagement
                  videoList={videoList.sort(
                    (a, b) => a.videoSequence - b.videoSequence,
                  )}
                  setVideoList={setVideoList}
                  onlineCourseId={courseList[selectedClassindex].courseId}
                  classIndex={selectedClassindex}
                  deleteCheckArr={deleteCheckArr}
                  setDeleteCheckArr={setDeleteCheckArr}
                />
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
                  if (primaryClassInfo.title.length === 0) {
                    alert('수업 제목은 필수입니다.');
                  }
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
