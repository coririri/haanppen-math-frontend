import PropTypes from 'prop-types';

const studentInformationShape = {
  grade: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
};

export default studentInformationShape;
