import { useState } from 'react';
import { AiOutlineSmile, AiFillEdit } from 'react-icons/ai';
import IconButton from '../atoms/IconButton';
import DropdownMenu from '../molecules/DropdownMenu';
import ClassList from '../organisms/ClassList';
import ClassEnrollmentModal from '../modals/ClassEnrollmentModal';

function ClassManagementPage() {
  const [enrollmentModalOpen, setEnrollmentModalOpen] = useState(false);
  const [teacherArr] = useState(['선생님 전체', '권나희', '하경현']);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="w-full text-center">
      <ClassEnrollmentModal
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
              text="반 등록"
              handleClick={() => {
                setEnrollmentModalOpen(true);
              }}
            />
          </div>
          <div>
            <IconButton
              bgColor="white"
              icon={<AiFillEdit size="26px" color="black" />}
              text="반 삭제"
              handleClick={() => {
                console.log('반 삭제');
              }}
            />
          </div>
        </div>
        <div>
          <div className="relative inline-block">
            <DropdownMenu
              size="normal"
              textArr={teacherArr}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              isOpen={isDropdownOpen}
              handleClick={() => {
                setIsDropdownOpen((prev) => !prev);
              }}
            />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <ClassList />
      </div>
    </div>
  );
}

export default ClassManagementPage;
