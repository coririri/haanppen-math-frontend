import React from 'react';

function TextButton({ children }) {
  if (children) return <div>{children}</div>;
}

export default TextButton;

TextButton.prototype = {
  children: PropTypes.node,
};
