import { useRef, useState } from 'react';
import { AiOutlineSmile, AiOutlineSearch, AiFillEdit } from 'react-icons/ai';
import IconButton from '../atoms/IconButton';
import TeacherList from '../organisms/TeacherList';
import TeacherEnrollmentModal from '../modals/TeacherEnrollmentModal';

function TeacherManagementPage() {
  const { searchRef } = useRef();
  const [enrollmentModalOpen, setEnrollmentModalOpen] = useState(false);
  return (
    <div className="w-full text-center">
      <TeacherEnrollmentModal
        enrollmentModalOpen={enrollmentModalOpen}
        setEnrollmentModalOpen={setEnrollmentModalOpen}
      />
      <hr className="h-[1px] border-0 bg-hpGray w-[700px] mx-auto mt-2" />
      <div className="flex items-center  w-[550px] mx-auto justify-between mt-4">
        <div className="flex items-center">
          <div className="mr-6">
            <IconButton
              bgColor="blue"
              icon={<AiOutlineSmile size="26px" color="white" />}
              text="강사 등록"
              handleClick={() => {
                setEnrollmentModalOpen(true);
              }}
            />
          </div>
          <div>
            <IconButton
              bgColor="white"
              icon={<AiFillEdit size="26px" color="black" />}
              text="강사 삭제"
              handleClick={() => {
                console.log('강사 삭제');
              }}
            />
          </div>
        </div>
        <div>
          <div className="relative inline-block">
            <input
              type="text"
              className="w-[180px] h-[36px] leading-[21px] border-[1.3px] border-solid border-black pr-2 pl-4 rounded-sm focus-visible:outline-0 text-lg"
              placeholder="강사 이름 검색"
              ref={searchRef}
            />
            <button
              className="absolute bg-bjsBlue text-md p-1 pl-3 text-white right-0 top-[1px] rounded-r-xl "
              type="button"
              aria-label="강사 검색"
              onClick={() => {
                console.log('검색');
              }}
            >
              <AiOutlineSearch size="26px" className="mr-2" color="black" />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <TeacherList />
      </div>
    </div>
  );
}

export default TeacherManagementPage;
