import { AiFillEdit, AiOutlineBook } from 'react-icons/ai';
import 'react-datepicker/dist/react-datepicker.css'; // 스타일을 불러옵니다.
import IconButton from '../atoms/IconButton';
import InputBox from '../atoms/InputBox';
import '../../css/datepicker/datepicker.css';
import Textarea from '../atoms/Textarea';
import TextButton from '../atoms/TextButton';

function ClassDetailTab({
  classDetailData,
  setClassDetailData,
  isCreated,
  setIsCreated,
}) {
  return (
    <div className="w-[750px] mx-auto">
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
            handleClick={() => {}}
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
            handleClick={() => {}}
          >
            저장
          </TextButton>
        )}

        <Textarea
          moreStyle="w-full font-bold leading-[26px] h-[120px] mt-1"
          value={classDetailData.desc}
          onChange={(e) => {
            setClassDetailData((prev) => ({
              ...prev,
              desc: e.target.value,
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
            handleClick={() => {
              setIsCreated(false);
            }}
          />
        </div>
      ) : (
        <div className="text-center mt-4">
          <IconButton
            bgColor="white"
            icon={<AiFillEdit size="20px" />}
            text="수업 생성"
            handleClick={() => {
              setIsCreated(true);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ClassDetailTab;
