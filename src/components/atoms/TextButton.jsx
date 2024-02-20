import PropTypes from 'prop-types';

function TextButton({ color, shape, text, isClick, handleClick, moreStyle }) {
  if (color === 'white')
    if (shape === 'long')
      return (
        <button
          className={`inline-block w-[16.75rem] h-[2.375rem]  border-hpBlack border-[0.072rem] rounded-lg font-bold ${isClick ? 'bg-hpWhiteBlue' : 'bg-white'} ${moreStyle}`}
          type="button"
          onClick={handleClick}
        >
          <span className="text-[1.7rem] leading-[2.375rem]">{text}</span>
        </button>
      );
    else if (shape === 'square')
      return (
        <button
          className={`inline-block w-[3.8rem] h-[3.8rem] py-3 px-4 border-[0.072rem] rounded-lg text-3xl font-bold ${isClick ? 'bg-hpWhiteBlue border-hpClickedWhiteBlue' : 'bg-white border-hpGray'} ${moreStyle}`}
          type="button"
          onClick={handleClick}
        >
          {text}
        </button>
      );
  if (color === 'gray')
    return (
      <button
        className={`inline-block w-[6.25rem] h-[2rem] border-hpGray border-[0.072rem] rounded-full font-bold bg-hpLightGray hover:bg-hpHoverLightGray ${moreStyle}`}
        type="button"
      >
        <span className="text-xl">{text}</span>
      </button>
    );
}

TextButton.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['white', 'gray']),
  shape: PropTypes.oneOf(['long', 'square']),
  isClick: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  moreStyle: PropTypes.string,
};

TextButton.defaultProps = {
  color: 'white',
  shape: 'long',
  moreStyle: '',
};

export default TextButton;
