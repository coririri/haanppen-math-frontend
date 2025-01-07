import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import TextButton from '../atoms/TextButton';
import TeacherModificationModal from '../modals/TeacherModificationModal';

interface TeacherItemProps {
  name: string;
  phoneNumber: string;
  id: number; // Assuming the id is a number, adjust if it's a different type
  setForDeletedTeacherIds: React.Dispatch<React.SetStateAction<number[]>>; // Assuming you want to manage a list of teacher IDs to delete
  searchNameValue: string;
  page: number; // Assuming page is a number, adjust if necessary
}

function TeacherItem({
  name,
  phoneNumber,
  id,
  setForDeletedTeacherIds,
  searchNameValue,
  page,
}: TeacherItemProps) {
  const [modificationModalOpen, setModificationModalOpen] = useState(false);
  const queryClient = useQueryClient();
  return (
    <div>
      <TeacherModificationModal
        modificationModalOpen={modificationModalOpen}
        setModificationModalOpen={setModificationModalOpen}
        queryKeyQueryClient={queryClient}
        queryKeySearchNameValue={searchNameValue}
        page={page}
        id={id}
        name={name}
        phoneNumber={phoneNumber}
      />
      <div className="flex items-center justify-between my-2">
        <input
          type="checkbox"
          className="w-[16px] h-[16px]"
          onChange={(e) => {
            if (e.target.checked) {
              setForDeletedTeacherIds((prev) => [...prev, id]);
            } else {
              setForDeletedTeacherIds((prev) =>
                prev.filter((item) => item !== id),
              );
            }
          }}
        />
        <span className="text-lg font-bold text-black w-[90px] text-center">
          {name}
        </span>
        <span className="text-lg font-bold text-black w-[160px]">
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
  );
}

export default TeacherItem;
