import PropTypes from 'prop-types';

function TextButton({
  color,
  shape,
  children,
  isClick,
  handleClick,
  moreStyle,
}) {
  if (color === 'white')
    if (shape === 'long')
      return (
        <button
          className={`py-1 px-20 border-hpBlack border-[0.072rem] rounded-lg text-2xl font-semibold ${isClick ? 'bg-hpWhiteBlue' : 'bg-white'} ${moreStyle}`}
          type="button"
          onClick={handleClick}
        >
          {children}
        </button>
      );
    else if (shape === 'square')
      return (
        <button
          className={`py-1 px-2 border-[0.072rem] rounded-lg text-2xl font-semibold ${isClick ? 'bg-hpWhiteBlue border-hpClickedWhiteBlue' : 'bg-white border-hpGray'} ${moreStyle}`}
          type="button"
          onClick={handleClick}
        >
          {children}
        </button>
      );
  if (color === 'gray')
    return (
      <button
        className={`py-1 px-10 border-hpGray border-[0.072rem] rounded-full text-2xl font-semibold bg-hpLightGray hover:bg-hpHoverLightGray ${moreStyle}`}
        type="button"
      >
        {children}
      </button>
    );
}

TextButton.propTypes = {
  children: PropTypes.string.isRequired,
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
