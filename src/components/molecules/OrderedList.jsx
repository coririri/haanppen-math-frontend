import PropTypes from 'prop-types';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';
import Input from '../atoms/Input';

function OrderedList({
  type,
  order,
  orderedState,
  setOrderedState,
  deletedIndexArr,
  setDeletedIndexArr,
}) {
  const handleBlur = (e) => {
    const updatedOreredState = [...orderedState];
    updatedOreredState.splice(order - 1, 1, e.target.value);
    setOrderedState(updatedOreredState);
  };

  const handleCheckbox = () => {
    const updatedDeletedIndexArr = [...deletedIndexArr];
    const found = updatedDeletedIndexArr.findIndex((ele) => ele === order);
    if (found !== -1) {
      // 찾으면
      updatedDeletedIndexArr.splice(found, 1);
    } else {
      // 못 찾으면
      updatedDeletedIndexArr.push(order);
    }
    console.log(updatedDeletedIndexArr);
    setDeletedIndexArr(updatedDeletedIndexArr);
  };

  if (type === 'videoRegistration')
    return (
      <li>
        <div className="flex items-center w-[40rem] h-[4rem]">
          <div className="flex flex-col items-center justify-evenly w-[3rem] h-[4rem]">
            <button
              type="button"
              aria-label="위로 올리기"
              className="w-[1.68rem] h-[1.68rem] bg-white rounded-2xl"
            >
              <FiArrowUp size="1.68rem" />
            </button>
            <button
              type="button"
              aria-label="아래로 내리기"
              className="w-[1.68rem] h-[1.68rem] bg-white rounded-2xl"
            >
              <FiArrowDown size="1.68rem" />
            </button>
          </div>
          <div className="flex justify-center items-center w-[2.5rem]">
            <Input type="checkbox" size="big" handleChange={handleCheckbox} />
          </div>
          <div className="flex justify-center w-[7.5rem]">
            <span className="text-2xl font-bold">{order}번 영상</span>
          </div>
          <div className="w-[25.25rem]">
            <Input
              type="singleLine"
              value={orderedState[order - 1]}
              handleBlur={handleBlur}
            />
          </div>
        </div>
        <div className="w-[39rem] h-[0.1rem] bg-white" />
      </li>
    );
  if (type === 'videoRegistered') return <div>videoRegistered</div>;
  if (type === 'chapter') return <div>chapter</div>;
}

OrderedList.propTypes = {
  type: PropTypes.oneOf(['videoRegistration', 'videoRegistered', 'chapter'])
    .isRequired,
  order: PropTypes.number.isRequired,
  orderedState: PropTypes.arrayOf(PropTypes.string).isRequired,
  setOrderedState: PropTypes.func.isRequired,
  deletedIndexArr: PropTypes.arrayOf(PropTypes.number).isRequired,
  setDeletedIndexArr: PropTypes.func.isRequired,
};

OrderedList.defaultProps = {};

export default OrderedList;
