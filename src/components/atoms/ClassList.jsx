import PropTypes from 'prop-types';
import { BiBookOpen, BiBookBookmark } from 'react-icons/bi';

function ClassList({ type, text }) {
  if (type === 'progress') {
    return (
      <div className="w-[34.5rem] flex items-center">
        <div className="w-[6.8rem] h-[2.875rem] flex items-center">
          <BiBookOpen size="1.8rem" color="black" />
          <span className="text-2xl mr-1 font-bold pl-[0.2rem]">진도</span>
          <div className="h-5 w-[0.12rem] bg-hpBlack ml-[0.2rem]" />
        </div>
        <div className="w-[27.7rem] h-[2.875rem] text-center">
          <span className="text-lg font-bold leading-[2.875rem]">{text}</span>
        </div>
      </div>
    );
  }
  if (type === 'homework') {
    return (
      <div className="w-[34.5rem] flex items-center">
        <div className="w-[6rem] h-[2.875rem]  flex items-center">
          <BiBookBookmark size="1.8rem" color="black" />
          <span className="text-2xl mr-1 font-bold pl-[0.2rem]">숙제</span>
          <div className="h-5 w-[0.12rem] bg-hpBlack ml-[0.2rem]" />
        </div>
        <div className="w-[27.7rem] h-[2.875rem]  text-center">
          <span className="text-lg font-bold leading-[2.875rem]">{text}</span>
        </div>
      </div>
    );
  }
}

ClassList.propTypes = {
  type: PropTypes.oneOf(['progress', 'homework']).isRequired,
  text: PropTypes.string.isRequired,
};

export default ClassList;
