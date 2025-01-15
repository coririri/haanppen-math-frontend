import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import TextButton from '../atoms/TextButton';
import gradeTransform from '../../utils/gradeTransform';
import StudentModificationModal from '../modals/StudentModificationModal';

interface StudentItemProps {
  grade: number;
  name: string;
  id: number;
  page: number;
  phoneNumber: string;
  setForDeletedStudentIds: React.Dispatch<React.SetStateAction<number[]>>;
  choosenGradeIndex: number;
  searchNameValue: string;
}

function StudentItem({
  grade,
  name,
  id,
  page,
  phoneNumber,
  setForDeletedStudentIds,
  choosenGradeIndex,
  searchNameValue,
}: StudentItemProps) {
  const [modificationModalOpen, setModificationModalOpen] = useState(false);

  const queryClient = useQueryClient();
  return (
    <div>
      <StudentModificationModal
        modificationModalOpen={modificationModalOpen}
        setModificationModalOpen={setModificationModalOpen}
        queryKeyQueryClient={queryClient}
        queryKeyChoosenGradeIndex={choosenGradeIndex}
        queryKeySearchNameValue={searchNameValue}
        page={page}
        id={id}
        grade={grade}
        name={name}
        phoneNumber={phoneNumber}
      />
      <div>
        <div className="flex items-center justify-between my-2">
          <input
            type="checkbox"
            className="w-[16px] h-[16px]"
            onChange={(e) => {
              if (e.target.checked) {
                setForDeletedStudentIds((prev) => [...prev, id]);
              } else {
                setForDeletedStudentIds((prev) =>
                  prev.filter((item) => item !== id),
                );
              }
            }}
          />
          <span className="text-lg font-bold text-black w-[60px] text-center">
            {gradeTransform(grade + 1)}
          </span>
          <span className="text-lg font-bold text-black w-[90px] text-center">
            {name}
          </span>
          <span className="text-lg font-bold text-black w-[140px]">
            {phoneNumber}
          </span>
          <div className="w-[100px]">
            <TextButton
              moreStyle="w-[4rem]"
              color="gray"
              isClick={modificationModalOpen}
              handleClick={() => {
                setModificationModalOpen((prev) => !prev);
              }}
            >
              수정
            </TextButton>
          </div>
        </div>
        <hr className="h-[0.5px] border-0 bg-hpGray w-[800px] mx-auto mt-2" />
      </div>
    </div>
  );
}

export default StudentItem;
