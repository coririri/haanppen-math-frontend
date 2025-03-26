import { FcVideoFile } from 'react-icons/fc';
import { useNavigate, useSearchParams } from 'react-router-dom';
import TextButton from '../atoms/TextButton';
import { dateTimeToDateAndTimes } from '../../utils/dateTimeToDate';
import { addLessonVideo } from '../../apis/lesson';
import { postOnlineCourseVedio } from '../../apis/onlineLesson';
import { DirectoryType } from '../../types/directoryType';
import secondToTime from '../../utils/secondToTime';

function FileDetailTab({ fileData }: { fileData: DirectoryType }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  console.log(fileData);
  return (
    <div className="w-full">
      <div className="w-full flex mt-8">
        <span className="block w-[200px] font-bold mx-4 pl-4 leading-[30px] text-xl">
          {fileData.fileName.slice(0, -4)}.mp4
        </span>
      </div>
      <div className="pl-8">
        <div className="mt-12">
          <span className="underline underline-offset-4 text-hpDarkBlue text-lg font-bold">
            상세 정보
          </span>
        </div>
        <div className="mt-4 ml-4 flex items-center justify-center w-[150px] h-[150px] border-solid border-[1px] border-[#C0C0C0] rounded-3xl outline-none bg-hpLightBlue/10 ">
          <FcVideoFile size="6rem" />
        </div>
        <div className="flex mt-16">
          <span className="block w-[100px] text-[#BFBFBF]">종류</span>
          <span className="font-bold">파일</span>
        </div>
        {/* <div className="flex mt-2">
          <span className="block w-[100px] text-[#BFBFBF]">크기</span>
          <span className="font-bold">10GB</span>
        </div> */}
        <div className="flex mt-2">
          <span className="block w-[100px] text-[#BFBFBF]">올린 날짜</span>
          <span className="font-bold">
            {' '}
            {dateTimeToDateAndTimes(new Date(fileData.createdTime))}
          </span>
        </div>
        <div className="flex mt-2">
          <span className="block w-[100px] text-[#BFBFBF]">영상 길이</span>
          <span className="font-bold">
            {secondToTime(fileData.runtimeDuration)}
          </span>
        </div>
        <div className="w-[9rem] mx-auto mt-24 mb-4">
          <TextButton
            color="gray"
            moreStyle="w-[9rem]"
            handleClick={async () => {
              try {
                console.log(searchParams.get('onlineCourseId'));
                if (searchParams.get('onlineCourseId') === null) {
                  const memoId = searchParams.get('memoId');
                  if (memoId !== null) {
                    await addLessonVideo(Number(memoId), fileData.path); // Ensure it's a number
                  }
                  navigate(
                    `/enroll-class?date=${searchParams.get('date')}&classIndex=${searchParams.get('classIndex')}&classType=offline`,
                  );
                } else {
                  const onlineCourseId = searchParams.get('onlineCourseId');
                  if (onlineCourseId !== null)
                    await postOnlineCourseVedio(
                      Number(onlineCourseId),
                      fileData.path,
                    );
                  navigate(
                    `/enroll-class?date=${searchParams.get('date')}&classIndex=${searchParams.get('classIndex')}&classType=online`,
                  );
                }
              } catch (e) {
                console.log(e);
              }
            }}
          >
            영상 선택
          </TextButton>
        </div>
      </div>
    </div>
  );
}

export default FileDetailTab;
