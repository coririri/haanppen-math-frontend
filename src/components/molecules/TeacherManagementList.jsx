import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import TextButton from '../atoms/TextButton';
import { checkDeletedTeacherIndex } from '../../stores/slices/teacherListSlice';

function TeacherManagementList({ index }) {
  const { teachers } = useSelector((state) => state.teacher);
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal((prev) => !prev);
  };
  const { name, phoneNumber } = teachers[index];
  return (
    <div className="w-[42.875rem] h-[3.375rem] flex items-center">
      <div className="w-[7.5rem]">
        <input
          type="checkbox"
          className="w-[1.125rem] h-[1.125rem] mx-auto flex items-center border-hpLightkBlack border-solid border-[0.1rem]"
          onChange={() => {
            dispatch(checkDeletedTeacherIndex(index));
          }}
        />
      </div>
      <div className="w-[19.375rem] flex justify-center">
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

TeacherManagementList.propTypes = {
  index: PropTypes.number.isRequired,
};

export default TeacherManagementList;
