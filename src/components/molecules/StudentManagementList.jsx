import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import TextButton from '../atoms/TextButton';
import gradeTransform from '../../utils/gradeTransform';
import { checkDeletedStudentIndex } from '../../stores/slices/studentListSlice';

function StudentManagementList({ index }) {
  const { students } = useSelector((state) => state.student);
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal((prev) => !prev);
  };
  const { grade, name, phoneNumber } = students[index];
  return (
    <div className="w-[42.875rem] h-[3.375rem] flex items-center">
      <div className="w-[7.5rem]">
        <input
          type="checkbox"
          className="w-[1.125rem] h-[1.125rem] mx-auto flex items-center border-hpLightkBlack border-solid border-[0.1rem]"
          onChange={() => {
            dispatch(checkDeletedStudentIndex(index));
          }}
        />
      </div>
      <div className="w-[8rem] flex justify-center">
        <span className="text-xl text-hpBlack font-bold">
          {gradeTransform(grade)}
        </span>
      </div>
      <div className="w-[11.375rem] flex justify-center">
        <span className="text-xl text-hpBlack font-bold">{name}</span>
      </div>
      <div className="w-[16rem] flex justify-center">
        <span className="text-xl text-hpBlack font-bold">{phoneNumber}</span>
      </div>
      <div className="w-[11rem] flex justify-center">
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
  index: PropTypes.number.isRequired,
};

export default StudentManagementList;
