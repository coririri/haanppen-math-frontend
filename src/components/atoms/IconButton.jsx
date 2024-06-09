import PropTypes from 'prop-types';

function IconButton({ bgColor, icon, text, handleClick, disabled = false }) {
  // icon의 크기는 1.5rem으로 주세요
  if (bgColor === 'white') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="h-[2.75rem]"
        disabled={disabled}
      >
        <div
          className={`inline-flex items-center font-bold border-[1.5px] border-solid py-1 px-5 rounded-lg  ${disabled ? 'border-hpGray' : 'border-black'}`}
        >
          {icon}
          <span
            className={`ml-2 text-md py-[0.15rem]  ${disabled ? 'text-hpGray' : 'text-black'}`}
          >
            {text}
          </span>
        </div>
      </button>
    );
  }
  if (bgColor === 'red') {
    return (
      <button type="button" onClick={handleClick} className="h-[2.375rem]">
        <div className="bg-hpLightRed inline-flex items-center font-bold border-[1.5px] border-solid border-[#A50028] py-[0.2rem] px-3 rounded-lg">
          {icon}
          <span className="ml-2 text-md py-[0.15rem] text-white font-sjBold">
            {text}
          </span>
        </div>
      </button>
    );
  }
  if (bgColor === 'blue') {
    return (
      <button type="button" onClick={handleClick} className="h-[2.375rem]">
        <div className="bg-hpLightBlue inline-flex items-center font-bold border-[1.5px] border-solid border-[#008FE0] py-1 px-5 rounded-lg">
          {icon}
          <span className="ml-2 text-md py-[0.15rem] text-white font-sjBold">
            {text}
          </span>
        </div>
      </button>
    );
  }
}

IconButton.propTypes = {
  bgColor: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default IconButton;
