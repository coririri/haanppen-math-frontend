import PropTypes from 'prop-types';
import ClassDropdownList from '../molecules/ClassDropdownList';
import studentByGrade from '../../types/studentByGrade';

function ClassDropdown({
  gradeByStudent,
  setGradeByStudent,
  newClassInformation,
  setNewGradeByStudent,
  type,
}) {
  return (
    <div className="w-[19.81rem] h-[32.93rem] scroll overflow-y-auto overflow-x-hidden border-[0.1rem] border-hpLightkBlack border-solid rounded-lg">
      {type === 'plus'
        ? gradeByStudent
            .filter((err) => err.num > 0)
            .map((err) => (
              <ClassDropdownList
                key={err.grade}
                grade={err.grade}
                num={err.num}
                students={err.students}
                gradeByStudent={gradeByStudent}
                setGradeByStudent={setGradeByStudent}
                newClassInformation={newClassInformation}
                setNewGradeByStudent={setNewGradeByStudent}
                type={type}
              />
            ))
        : newClassInformation
            .filter((err) => err.num > 0)
            .map((err) => (
              <ClassDropdownList
                key={err.grade}
                grade={err.grade}
                num={err.num}
                students={err.students}
                gradeByStudent={gradeByStudent}
                setGradeByStudent={setGradeByStudent}
                newClassInformation={newClassInformation}
                setNewGradeByStudent={setNewGradeByStudent}
                type={type}
              />
            ))}
    </div>
  );
}

ClassDropdown.propTypes = {
  gradeByStudent: PropTypes.arrayOf(PropTypes.shape(studentByGrade)).isRequired,
  setGradeByStudent: PropTypes.func.isRequired,
  newClassInformation: PropTypes.arrayOf(PropTypes.shape(studentByGrade))
    .isRequired,
  setNewGradeByStudent: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['plus', 'minus']).isRequired,
};

export default ClassDropdown;
