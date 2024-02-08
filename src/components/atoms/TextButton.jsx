import React from 'react';
import PropTypes from 'prop-types';

function TextButton({ color, children }) {
  if (color === 'white')
    return (
      <button
        className="py-1 px-20 border-hpBlack border-[0.072rem] rounded-lg text-2xl font-semibold"
        type="button"
      >
        {children}
      </button>
    );
  if (color === 'gray') return <div>{children}</div>;
}

TextButton.propTypes = {
  children: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['white', 'gray']),
};

TextButton.defaultProps = {
  color: 'white',
};

export default TextButton;
