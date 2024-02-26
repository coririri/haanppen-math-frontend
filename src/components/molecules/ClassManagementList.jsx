import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import TextButton from '../atoms/TextButton';

function ClassManagementList({ setDeletedIndexArr, index, checked }) {
  const classList = useSelector((state) => state.class.classes);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal((prev) => !prev);
  };

  const { className, num, teacherName } = classList[index];

  return (
    <div className="w-[42.875rem] h-[3.375rem] flex items-center">
      <div className="w-[7.5rem]">
        <input
          type="checkbox"
          className="w-[1.125rem] h-[1.125rem] mx-auto flex items-center border-hpLightkBlack border-solid border-[0.1rem]"
          checked={checked}
          onChange={() => {
            setDeletedIndexArr((prev) => {
              const newDeletedIndexArr = prev.slice();
              newDeletedIndexArr[index] = !prev[index];
              return newDeletedIndexArr;
            });
          }}
        />
      </div>
      <div className="w-[8rem] flex justify-center">
        <span className="text-xl text-hpBlack font-bold">{className}</span>
      </div>
      <div className="w-[11.375rem] flex justify-center">
        <span className="text-xl text-hpBlack font-bold">{num}</span>
      </div>
      <div className="w-[16rem] flex justify-center">
        <span className="text-xl text-hpBlack font-bold">{teacherName}</span>
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

ClassManagementList.propTypes = {
  setDeletedIndexArr: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default ClassManagementList;
