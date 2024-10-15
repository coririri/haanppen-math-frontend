import { useState } from 'react';
import { AiFillEdit, AiOutlineBook } from 'react-icons/ai';
import DeleteCheckModal from '../modals/DeleteCheckModal';
import 'react-datepicker/dist/react-datepicker.css'; // 스타일을 불러옵니다.
import IconButton from '../atoms/IconButton';
import InputBox from '../atoms/InputBox';
import '../../css/datepicker/datepicker.css';
import Textarea from '../atoms/Textarea';
import TextButton from '../atoms/TextButton';
import enrollLesson, {
  deleteLessonById,
  putLessonDetailContentByClassId,
} from '../../apis/lesson';

function ClassDetailTab({
  classId,
  classDetailData,
  setClassDetailData,
  isCreated,
  setIsCreated,
  startDate,
  courseList,
  selectedClassindex,
}) {
  const [deleteCheckModalOpen, setDeleteCheckModalOpen] = useState(false);

  return (
    <div className="w-[750px] mx-auto">
      <DeleteCheckModal
        deleteCheckModalOpen={deleteCheckModalOpen}
        setDeleteCheckModalOpen={setDeleteCheckModalOpen}
        handleDelete={async () => {
          try {
            await deleteLessonById(classId);
            setIsCreated(false);
            setDeleteCheckModalOpen(false);
          } catch (e) {
            console.log(e);
          }
        }}
      />

      <div className="flex justify-center items-center mt-4">
        <AiOutlineBook size="1.7rem" className="mr-2" />
        <span className="font-bold text-2xl">수업 세부 내용</span>
      </div>

      <div>
        <span className="ml-4 text-md font-bold">제목(필수 항목)</span>
        {isCreated && (
          <TextButton
            color="gray"
            moreStyle="w-[5rem] ml-4 mb-1"
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
        )}
        <InputBox
          moreStyle="w-full font-bold leading-[26px] mb-5"
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
        <span className="ml-4 text-md font-bold">수업 내용</span>
        {isCreated && (
          <TextButton
            color="gray"
            moreStyle="w-[5rem] ml-4 mb-1"
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
        )}

        <Textarea
          moreStyle="w-full font-bold leading-[26px] h-[120px] mt-1"
          value={classDetailData.content}
          onChange={(e) => {
            setClassDetailData((prev) => ({
              ...prev,
              content: e.target.value,
            }));
          }}
        />
      </div>

      {isCreated ? (
        <div className="text-center mt-4">
          <IconButton
            bgColor="white"
            icon={<AiFillEdit size="20px" />}
            text="수업 삭제"
            handleClick={async () => {
              setDeleteCheckModalOpen(true);
            }}
          />
        </div>
      ) : (
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

              try {
                await enrollLesson(
                  courseList[selectedClassindex].courseId,
                  startDate,
                  classDetailData.title,
                  classDetailData.content,
                );
                setIsCreated(true);
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
