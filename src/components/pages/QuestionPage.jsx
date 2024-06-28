import { BsBookmarkCheckFill, BsClock } from 'react-icons/bs';
import { BiCommentDots } from 'react-icons/bi';
import { AiFillEdit } from 'react-icons/ai';
import hw1 from '../../assests/hw1.jpg';
import hw2 from '../../assests/hw2.jpg';
import IconButton from '../atoms/IconButton';
// import { useParams } from 'react-router-dom';

function QuestionPage() {
  // const { id } = useParams();
  return (
    <div className="w-full">
      <div className="w-[900px] h-[30px] mx-auto mt-8 bg-hpLightGray">
        <div className="h-full flex items-center justify-between">
          <div className="h-full flex items-center ml-4">
            <BsBookmarkCheckFill />
            <span className="text-sm font-bold">고3</span>
            <span className="text-md ml-2 font-bold">김선우</span>
          </div>
          <div className="h-full flex items-center mr-4">
            <BsClock />
            <span className="ml-1 font-bold pt-[1px]">2024.01.08</span>
          </div>
        </div>
      </div>
      <hr className="h-[1px] border-0 bg-hpGray w-[900px] mx-auto mt-6 mb-2" />
      <img src={hw1} alt="숙제" className="w-[900px] mx-auto" />
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
              1
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
      </div>
      <div className="w-[900px] mx-auto">
        <img src={hw2} alt="숙제" className="w-[900px] mx-auto my-2" />
        <hr className="h-[1px] border-0 bg-hpGray w-[900px] mx-auto" />
        <div className="w-[900px] mx-auto my-2">
          <span>어쩌고 저쩌고~~</span>
        </div>
        <hr className="h-[1px] border-0 bg-hpGray w-[900px] mx-auto mt-2" />
      </div>
      <div className="fixed bottom-8 left-0 right-0 flex justify-center">
        <IconButton
          bgColor="white"
          icon={<AiFillEdit size="26px" color="black" />}
          text="댓글 작성"
          handleClick={() => {
            console.log('학생 삭제');
          }}
        />
      </div>
    </div>
  );
}

export default QuestionPage;
