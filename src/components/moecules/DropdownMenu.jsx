import PropTypes from 'prop-types';

function DropdownMenu({ children }) {
  return <div>{children}</div>;
}

DropdownMenu.propTypes = {
  children: PropTypes.node,
};

DropdownMenu.defaultProps = {
  children: null,
};

export default DropdownMenu;
