import { AiFillEdit, AiOutlineBook } from 'react-icons/ai';
import 'react-datepicker/dist/react-datepicker.css'; // 스타일을 불러옵니다.
import IconButton from '../atoms/IconButton';
import '../../css/datepicker/datepicker.css';
import TextButton from '../atoms/TextButton';
import enrollLesson, {
  putLessonDetailContentByClassId,
} from '../../apis/lesson';
import { dateTimeToDateAndZeroTimes } from '../../utils/dateTimeToDate';
import { OfflineClassType } from '../../types/offlineClassType';
import { CourseType } from '../../types/courseType';

interface ClassDetailTabProps {
  classId: number;
  classDetailData: OfflineClassType;
  setClassDetailData: React.Dispatch<React.SetStateAction<OfflineClassType>>;
  isCreated: boolean;
  setIsCreated: React.Dispatch<React.SetStateAction<boolean>>;
  startDate: Date;
  courseList: CourseType[];
  selectedClassindex: number;
}

function ClassDetailTab({
  classId,
  classDetailData,
  setClassDetailData,
  isCreated,
  setIsCreated,
  startDate,
  courseList,
  selectedClassindex,
}: ClassDetailTabProps) {
  return (
    <div className="mx-auto">
      <div className="flex justify-center items-center">
        <AiOutlineBook size="1.7rem" className="mr-2" />
        <span className="font-bold text-3xl mr-2">수업 세부 내용</span>
      </div>

      <div>
        <div className="my-4">
          <span className="ml-4 text-md font-bold">제목(필수 항목)</span>
        </div>
        <textarea
          className="w-[32rem] h-16 p-1 pl-3 border border-black  rounded-lg focus:outline-none focus:ring-2  transition-all duration-300 hover:shadow-lg"
          value={classDetailData.title}
          onChange={(e) => {
            setClassDetailData((prev) => ({
              ...prev,
              title: e.target.value,
            }));
          }}
        />
      </div>

      <div>
        <div className="my-4">
          <span className="ml-4 text-md font-bold">수업 내용</span>
        </div>
        <textarea
          className="w-[32rem] h-16 p-1 pl-3 border border-black  rounded-lg focus:outline-none focus:ring-2  transition-all duration-300 hover:shadow-lg"
          value={classDetailData.content}
          onChange={(e) => {
            setClassDetailData((prev) => ({
              ...prev,
              content: e.target.value,
            }));
          }}
        />
      </div>
      {isCreated && (
        <div className="flex justify-center">
          <TextButton
            color="gray"
            moreStyle="w-[7rem] my-2 py-[1px]"
            handleClick={async () => {
              try {
                await putLessonDetailContentByClassId(
                  classId,
                  classDetailData.title,
                  classDetailData.content,
                );
              } catch (e) {
                console.log(e);
              }
            }}
          >
            저장
          </TextButton>
        </div>
      )}
      {!isCreated && (
        <div className="text-center mt-4">
          <IconButton
            bgColor="white"
            icon={<AiFillEdit size="20px" />}
            text="수업 생성"
            handleClick={async () => {
              if (classDetailData.title === '') {
                alert('수업의 제목을 반드시 적어주세요');
                return;
              }

              if (courseList.length === 0) {
                alert('반을 먼저 생성해주세요.');
                return;
              }

              try {
                await enrollLesson(
                  courseList[selectedClassindex].courseId,
                  new Date(dateTimeToDateAndZeroTimes(startDate)),
                  classDetailData.title,
                  classDetailData.content,
                );
                setIsCreated(true);
                window.location.reload();
              } catch (e) {
                console.log(e);
              }
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ClassDetailTab;
