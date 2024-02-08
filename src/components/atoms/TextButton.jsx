import React from 'react';
import PropTypes from 'prop-types';

function TextButton({ color, shape, children }) {
  if (color === 'white')
    if (shape === 'long')
      return (
        <button
          className="py-1 px-20 border-hpBlack border-[0.072rem] rounded-lg text-2xl font-semibold"
          type="button"
        >
          {children}
        </button>
      );
    else if (shape === 'square')
      return (
        <button
          className="py-1 px-2 border-hpGray border-[0.072rem] rounded-lg text-2xl font-semibold"
          type="button"
        >
          {children}
        </button>
      );
  if (color === 'gray')
    return (
      <button
        className="py-1 px-10 border-hpGray border-[0.072rem] rounded-full text-2xl font-semibold bg-hpLightGray"
        type="button"
      >
        {children}
      </button>
    );
}

TextButton.propTypes = {
  children: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['white', 'gray']),
  shape: PropTypes.oneOf(['long', 'squre']),
};

TextButton.defaultProps = {
  color: 'white',
  shape: 'long',
};

export default TextButton;
