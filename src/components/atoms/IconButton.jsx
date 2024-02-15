import PropTypes from 'prop-types';

function IconButton({ bgColor, icon, text, handleClick }) {
  if (bgColor === 'white') {
    return (
      <button type="button" onClick={handleClick}>
        <div className="inline-flex items-center font-bold border-[0.075rem] border-solid py-2 pl-4 pr-6 rounded-lg">
          {icon}
          <span className="ml-4 text-xs">{text}</span>
        </div>
      </button>
    );
  }
  if (bgColor === 'red') {
    return (
      <button type="button" onClick={handleClick}>
        <div className="bg-hpLightRed inline-flex items-center font-bold border-[0.075rem] border-solid border-[#A50028] py-[0.2rem] px-3 rounded-lg">
          <div className="w-7">{icon}</div>
          <span className="ml-2 text-xl text-white font-sjBold">{text}</span>
        </div>
      </button>
    );
  }
  if (bgColor === 'blue') {
    return (
      <button type="button" onClick={handleClick}>
        <div className="bg-hpLightBlue inline-flex items-center font-bold border-[0.075rem] border-solid border-[#008FE0] py-[0.2rem] px-3 rounded-lg">
          <div className="w-7">{icon}</div>
          <span className="ml-2 text-xl text-white font-sjBold">{text}</span>
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
