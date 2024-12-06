import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AiFillEdit } from 'react-icons/ai';
import DropdownMenu from '../molecules/DropdownMenu';
import { getOwnCourses } from '../../apis/course';
import IconButton from '../atoms/IconButton';
import OnlinePrimaryForm from '../organisms/OnlinePrimaryForm';
import OnlineVedioManagement from '../organisms/OnlineVedioManagement';
import DeleteCheckModal from '../modals/DeleteCheckModal';

function WriteOnlineClassPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [courseList, setCourseList] = useState([]);
  const [selectedClassindex, setSelectedClassindex] = useState(
    searchParams.get('classIndex'),
  );
  const [isCreated, setIsCreated] = useState(true);
  const [primaryClassInfo, setPrimaryClassInfo] = useState({
    title: '',
    lessonRange: '',
    lessonDesc: '',
  });
  const [mainCategorySelected, setMainCategorySelected] = useState(0);
  const [subCategorySelected, setSubCategorySelected] = useState(0);
  const [deleteClassCheckModalOpen, setDeleteClassCheckModalOpen] =
    useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getOwnCourses();
      setCourseList(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <DeleteCheckModal
        deleteCheckModalOpen={deleteClassCheckModalOpen}
        setDeleteCheckModalOpen={setDeleteClassCheckModalOpen}
        handleDelete={async () => {
          setIsCreated(false);
          setDeleteClassCheckModalOpen(false);
        }}
      />
      <DropdownMenu
        type="search"
        textArr={courseList.map((course) => course.courseName)}
        selectedIndex={selectedClassindex}
        setSelectedIndex={setSelectedClassindex}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <div className="flex justify-center">
        <div>
          {!isCreated ? (
            <div className="flex flex-col justify-center items-center">
              <OnlinePrimaryForm
                isCreated={isCreated}
                primaryClassInfo={primaryClassInfo}
                setPrimaryClassInfo={setPrimaryClassInfo}
                mainCategorySelected={mainCategorySelected}
                setMainCategorySelected={setMainCategorySelected}
                subCategorySelected={subCategorySelected}
                setSubCategorySelected={setSubCategorySelected}
              />
            </div>
          ) : (
            <div className="flex justify-center">
              <div>
                <OnlinePrimaryForm
                  isCreated={isCreated}
                  primaryClassInfo={primaryClassInfo}
                  setPrimaryClassInfo={setPrimaryClassInfo}
                  mainCategorySelected={mainCategorySelected}
                  setMainCategorySelected={setMainCategorySelected}
                  subCategorySelected={subCategorySelected}
                  setSubCategorySelected={setSubCategorySelected}
                />
              </div>
              <div className="flex flex-col justify-center items-center">
                <div className="w-[10px] h-[600px] bg-gray-200 mx-12 my-6" />
                <IconButton
                  bgColor="white"
                  icon={<AiFillEdit size="20px" />}
                  text="수업 삭제"
                  handleClick={() => {
                    setDeleteClassCheckModalOpen(true);
                  }}
                />
              </div>
              <div>
                <OnlineVedioManagement />
              </div>
            </div>
          )}
          <div className="flex justify-center mb-8">
            {!isCreated && (
              <IconButton
                bgColor="white"
                icon={<AiFillEdit size="20px" />}
                text="수업 생성"
                handleClick={() => {
                  setIsCreated(true);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WriteOnlineClassPage;
