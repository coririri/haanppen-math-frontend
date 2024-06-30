import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import TextButton from '../atoms/TextButton';
import gradeTransform from '../../utils/gradeTransform';
import StudentModificationModal from '../modals/StudentModificationModal';

function StudentItem({
  grade,
  name,
  id,
  phoneNumber,
  setForDeletedStudentIds,
  choosenGradeIndex,
  searchNameValue,
}) {
  const [modificationModalOpen, setModificationModalOpen] = useState(false);
  console.log(modificationModalOpen);
  const queryClient = useQueryClient();
  return (
    <div>
      <StudentModificationModal
        modificationModalOpen={modificationModalOpen}
        setModificationModalOpen={setModificationModalOpen}
        queryKeyQueryClient={queryClient}
        queryKeyChoosenGradeIndex={choosenGradeIndex}
        queryKeySearchNameValue={searchNameValue}
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
              color="gray"
              shape="square"
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
