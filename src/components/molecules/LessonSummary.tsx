import { useNavigate } from 'react-router-dom';
import { CourseOverviewType } from '../../types/courseType';
import lesson from '../../assests/lesson.jpg';
import imageUrlToSrc from '../../utils/imageUrlToSrc';

interface LessonSummaryProps {
  lessonOverviewData: CourseOverviewType; // 강좌의 개요 데이터
  // subCategoryName: string;
}

function LessonSummary({
  lessonOverviewData,
  // subCategoryName,
}: LessonSummaryProps) {
  const navigate = useNavigate();

  return (
    <div className="w-full relative">
      <div className="w-full flex justify-start items-center">
        <div>
          {lessonOverviewData.imageSrc == null ? (
            <img
              src={lesson}
              alt="수업 대표 이미지"
              className="w-[80px] ml-2 mr-4"
            />
          ) : (
            <img
              src={imageUrlToSrc(lessonOverviewData.imageSrc)}
              alt="수업 대표 이미지"
              className="w-[80px] ml-2 mr-4"
            />
          )}
        </div>
        <div className="">
          <div className="flex flex-wrap mb-[2px] gap-y-2">
            <span className="mr-2 text-[15px] bg-[#ffe8df] text-[#f47321] border-[#ffc9b2] border-[1.2px] border-solid px-[8px] py-[1px]">
              {lessonOverviewData.teacherPreview.teacherName} 선생님
            </span>
            <span className=" mr-2 text-[15px] bg-[#e9f1fe] text-[#5a83c0] border-[#c8d8f4] border-[1.2px] border-solid px-[8px] py-[1px]">
              {lessonOverviewData.lessonCategoryInfo.parentCategoryName}
            </span>
            <span className="text-[15px] bg-[#e8fbd9] text-[#6cbb27] border-[#bbe7a6] border-[1.2px] border-solid px-[8px] py-[1px]">
              {lessonOverviewData.lessonCategoryInfo.categoryName}
            </span>
          </div>
          <h2 className="font-bold text-[15px] mb-[2px]">
            {lessonOverviewData.courseName}
          </h2>
          <button
            type="button"
            className="text-[13px] px-4 py-[1px] text-gray-600 border-solid border-gray-600 border-[1.2px] rounded-md shadow-md hover:shadow-lg hover:bg-gray-600 hover:text-white hover:scale-105 transition duration-300"
            onClick={() => {
              navigate(
                `/preview-class?teacherName=${lessonOverviewData.teacherPreview.teacherName}&onlineCourseId=${lessonOverviewData.courseId}`,
              );
            }}
          >
            강좌 무료 체험
          </button>
        </div>
      </div>
      <div className="border-t-[1.2px] border-gray-400/40 border-solid w-full my-4" />
    </div>
  );
}

export default LessonSummary;
