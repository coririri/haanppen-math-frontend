import PropTypes from 'prop-types';

const studentByGrade = {
  grade: PropTypes.number.isRequired,
  num: PropTypes.number.isRequired,
  students: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default studentByGrade;
