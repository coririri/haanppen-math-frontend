import { BsBookmarkCheckFill, BsClock } from 'react-icons/bs';
import { BiCommentDots } from 'react-icons/bi';
import { AiFillEdit } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import IconButton from '../atoms/IconButton';
import { getDetailQuestionById } from '../../apis/question';
import imageUrlToSrc from '../../utils/imageUrlToSrc';
import gradeTransform from '../../utils/gradeTransform';
import dateTimeToDate from '../../utils/dateTimeToDate';
import WriteComment from '../organisms/WriteComment';
import CommentBox from '../organisms/CommentBox';

function QuestionDetailPage() {
  const { id } = useParams();
  let questionDetailData;
  let commentsData;
  const [data, setData] = useState(null);

  const [isWriteComment, setIsWriteComment] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const response = await getDetailQuestionById(id);
      console.log(response);
      questionDetailData = {
        imageUrl: imageUrlToSrc(response.imageUrls[0].imageUrl),
        registeredDateTime: response.registeredDateTime,
        registerMemberName: response.registeredMember.memberName,
        registerMemberGrade: response.registeredMember.memberGrade + 1,
      };
      commentsData = response.comments;
      console.log(commentsData);

      setData({
        questionDetailData,
        commentsData,
      });
      // data를 사용하여 추가 작업을 수행합니다.
    };

    getData();
  }, []);
  console.log(questionDetailData);
  console.log(commentsData);
  return (
    <div className="w-full">
      <div className="w-[900px] h-[30px] mx-auto mt-8 bg-hpLightGray">
        <div className="h-full flex items-center justify-between">
          <div className="h-full flex items-center ml-4">
            <BsBookmarkCheckFill />
            <span className="text-sm font-bold">
              {gradeTransform(data?.questionDetailData.registerMemberGrade)}
            </span>
            <span className="text-md ml-2 font-bold">
              {data?.questionDetailData.registerMemberName}
            </span>
          </div>
          <div className="h-full flex items-center mr-4">
            <BsClock />
            <span className="ml-1 font-bold pt-[1px]">
              {' '}
              {dateTimeToDate(data?.questionDetailData.registeredDateTime)}
            </span>
          </div>
        </div>
      </div>
      <hr className="h-[1px] border-0 bg-hpGray w-[900px] mx-auto mt-6 mb-2" />
      <img
        src={data?.questionDetailData.imageUrl}
        alt="숙제"
        className="w-[900px] mx-auto"
      />
      <hr className="h-[1px] border-0 bg-hpGray w-[900px] mx-auto mt-2" />
      <div className="mt-8 w-[900px] mx-auto">
        <div>
          <div className="flex items-center">
            <BiCommentDots size="30px" className="mr-1" />
            <span
              className="text-2xl font-bold mr-1 text-[#FF6B00]"
              style={{
                textShadow:
                  '-1px 0 black, 0 0.5px black, 0.5px 0 black, 0 -0.5px black',
              }}
            >
              {data?.commentsData.length}
            </span>
            <span
              className="text-xl font-bold text"
              style={{
                textShadow:
                  '-1px 0 black, 0 0.5px black, 0.5px 0 black, 0 -0.5px black',
              }}
            >
              Comments
            </span>
          </div>
          <hr className="h-[1px] border-0 bg-hpGray w-[150px] mt-[0.5px] mb-4" />
        </div>

        {/* <div className="w-[900px] mx-auto">
        <img src={hw2} alt="숙제" className="w-[900px] mx-auto my-2" />
        <hr className="h-[1px] border-0 bg-hpGray w-[900px] mx-auto" />
        <div className="w-[900px] mx-auto my-2">
          <span>어쩌고 저쩌고~~</span>
        </div>
        <hr className="h-[1px] border-0 bg-hpGray w-[900px] mx-auto mt-2" />
      </div> */}
        {!isWriteComment && (
          <div className="fixed bottom-8 left-0 right-0 flex justify-center">
            <IconButton
              bgColor="white"
              icon={<AiFillEdit size="26px" color="black" />}
              text="댓글 작성"
              handleClick={() => {
                setIsWriteComment(true);
                setTimeout(() => {
                  window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth', // 'auto'를 사용하면 부드러운 스크롤 없이 즉시 이동합니다.
                  });
                }, 200);
              }}
            />
          </div>
        )}
        {data?.commentsData?.map((comment) => (
          <CommentBox comment={comment} />
        ))}

        {isWriteComment && (
          <div>
            <WriteComment
              setIsWriteComment={setIsWriteComment}
              questionId={id}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionDetailPage;
