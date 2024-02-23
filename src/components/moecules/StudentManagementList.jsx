import { useState } from 'react';
import PropTypes from 'prop-types';
import TextButton from '../atoms/TextButton';
import studentInformationShape from '../../types/studentInformation';
import gradeTransform from '../../utils/gradeTransform';

function StudentManagementList({
  studentInformationArr,
  setDeletedIndexArr,
  index,
}) {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal((prev) => !prev);
  };
  const { grade, name, phoneNumber } = studentInformationArr[index];
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
        <span className="text-xl text-hpBlack font-bold">
          {gradeTransform(grade)}
        </span>
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
  studentInformationArr: PropTypes.arrayOf(
    PropTypes.shape(studentInformationShape),
  ).isRequired,
  setDeletedIndexArr: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default StudentManagementList;
