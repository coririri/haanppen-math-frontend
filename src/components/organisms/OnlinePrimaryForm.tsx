import { SetStateAction } from 'react';
import { AiOutlineBook } from 'react-icons/ai';
import enrollOnlineLesson from '../../apis/onlineLesson';
import TextButton from '../atoms/TextButton';
import DropdownMenu from '../molecules/DropdownMenu';
import { PrimaryClassInfoType } from '../../types/onlineClassInfoType';
import { CategoryType } from '../../types/categoryType';
import { CourseType } from '../../types/courseType';

interface OnlinePrimaryFormProps {
  isCreated: boolean;
  primaryClassInfo: PrimaryClassInfoType;
  setPrimaryClassInfo: React.Dispatch<SetStateAction<PrimaryClassInfoType>>;
  mainCategorySelected: number;
  setMainCategorySelected: React.Dispatch<SetStateAction<number>>;
  subCategorySelected: number;
  setSubCategorySelected: React.Dispatch<SetStateAction<number>>;
  mainCategorys: CategoryType[];
  subCategorys: CategoryType[];
  courseList: CourseType[];
  selectedClassindex: number;
}

function OnlinePrimaryForm({
  isCreated,
  primaryClassInfo,
  setPrimaryClassInfo,
  mainCategorySelected,
  setMainCategorySelected,
  subCategorySelected,
  setSubCategorySelected,
  mainCategorys,
  subCategorys,
  courseList,
  selectedClassindex,
}: OnlinePrimaryFormProps) {
  return (
    <div className="flex flex-col items-start justify-center my-6">
      <div className="flex justify-center items-center mx-auto">
        <AiOutlineBook size="1.7rem" className="mr-2" />
        <h3 className="font-bold text-3xl mr-2">수업 세부 내용</h3>
        {isCreated && (
          <TextButton
            color="gray"
            moreStyle="w-[5rem] "
            handleClick={async () => {
              try {
                await enrollOnlineLesson(
                  courseList[selectedClassindex].courseId,
                  primaryClassInfo.title,
                  primaryClassInfo.lessonRange,
                  primaryClassInfo.lessonDesc,
                  subCategorys[subCategorySelected].categoryId,
                );
              } catch (e) {
                console.log(e);
              }
            }}
          >
            저장
          </TextButton>
        )}
      </div>
      <div>
        <div className="my-4">
          <span className="ml-8 mr-2 text-sm font-bold text-gray-600">
            제목(필수 항목)
          </span>
        </div>
        <textarea
          value={primaryClassInfo.title}
          onChange={(e) => {
            setPrimaryClassInfo((prev) => {
              const copiedPrimaryClassInfo = { ...prev };
              copiedPrimaryClassInfo.title = e.target.value;
              return copiedPrimaryClassInfo;
            });
          }}
          placeholder="제목을 작성하세요"
          className="w-[32rem] h-16 p-1 pl-3 border border-black  rounded-lg focus:outline-none focus:ring-2  transition-all duration-300 hover:shadow-lg"
        />
      </div>

      <div>
        <div className="my-4">
          <span className="ml-8 mr-2 text-sm font-bold text-gray-600">
            강좌 범위
          </span>
        </div>
        <textarea
          value={primaryClassInfo.lessonRange}
          onChange={(e) => {
            setPrimaryClassInfo((prev) => {
              const copiedPrimaryClassInfo = { ...prev };
              copiedPrimaryClassInfo.lessonRange = e.target.value;
              return copiedPrimaryClassInfo;
            });
          }}
          placeholder="강좌 범위을 작성하세요"
          className="w-[32rem] h-16 p-1 pl-3 border border-black rounded-lg focus:outline-none focus:ring-2  transition-all duration-300 hover:shadow-lg"
        />
      </div>

      <div>
        <div className="my-4">
          <span className="ml-8 mr-2 text-sm font-bold text-gray-600">
            수업 내용
          </span>
        </div>
        <textarea
          value={primaryClassInfo.lessonDesc}
          onChange={(e) => {
            setPrimaryClassInfo((prev) => {
              const copiedPrimaryClassInfo = { ...prev };
              copiedPrimaryClassInfo.lessonDesc = e.target.value;
              return copiedPrimaryClassInfo;
            });
          }}
          placeholder="수업 내용을 작성하세요"
          className="w-[32rem] h-16 p-1 pl-3 border border-black rounded-lg focus:outline-none focus:ring-2  transition-all duration-300 hover:shadow-lg"
        />
      </div>
      <div>
        <div className="my-4">
          <span className="ml-8 mr-2 text-sm font-bold text-gray-600">
            수업 분류
          </span>
        </div>
        <div className="flex justify-center">
          <div className="mr-4">
            <DropdownMenu
              textArr={mainCategorys.map(
                (mainCategory) => mainCategory.categoryName,
              )}
              selectedIndex={mainCategorySelected}
              setSelectedIndex={setMainCategorySelected}
            />
          </div>

          <DropdownMenu
            textArr={subCategorys.map(
              (subCategory) => subCategory.categoryName,
            )}
            selectedIndex={subCategorySelected}
            setSelectedIndex={setSubCategorySelected}
          />
        </div>
      </div>
    </div>
  );
}

export default OnlinePrimaryForm;
