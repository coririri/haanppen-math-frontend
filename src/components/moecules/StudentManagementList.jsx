import { useState } from 'react';
import PropTypes from 'prop-types';
import TextButton from '../atoms/TextButton';

function StudentManagementList({
  grade,
  name,
  phoneNumber,
  setDeletedIndexArr,
  index,
}) {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal((prev) => !prev);
  };
  return (
    <div className="w-[42.875rem] h-[3.375rem] flex items-center justify-between">
      <div className="ml-8">
        <input
          type="checkbox"
          className="w-[1.125rem] h-[1.125rem] flex items-center border-hpLightkBlack border-solid border-[0.1rem]"
          onChange={() => {
            setDeletedIndexArr((prev) => {
              const newDeletedIndexArr = prev.slice();
              newDeletedIndexArr[index] = !prev[index];
              return newDeletedIndexArr;
            });
          }}
        />
      </div>
      <div>
        <span className="text-xl text-hpBlack font-bold">{grade}</span>
      </div>
      <div>
        <span className="text-xl text-hpBlack font-bold">{name}</span>
      </div>
      <div>
        <span className="text-xl text-hpBlack font-bold">{phoneNumber}</span>
      </div>
      <div className="mr-4">
        <TextButton
          color="gray"
          shape="long"
          text="수정"
          isClick={openModal}
          handleClick={handleOpenModal}
        />
      </div>
    </div>
  );
}

StudentManagementList.propTypes = {
  grade: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  setDeletedIndexArr: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default StudentManagementList;
