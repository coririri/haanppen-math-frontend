import { useState } from 'react';
import PropTypes from 'prop-types';
import { BsFillTriangleFill } from 'react-icons/bs';
import TextButton from '../atoms/TextButton';
import gradeTransform from '../../utils/gradeTransform';
import studentByGrade from '../../types/studentByGrade';

function ClassDropdownList({
  grade,
  num,
  students,
  gradeByStudent,
  setGradeByStudent,
  newClassInformation,
  setNewGradeByStudent,
  type,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickPlusButton = (plusType, student) => {
    if (plusType === 'grade') {
      const updatedArray = [...gradeByStudent];
      updatedArray.splice(grade - 1, 1, {
        grade,
        num: 0,
        students: [],
      });

      const updatedNewArray = [...newClassInformation];
      updatedNewArray.splice(grade - 1, 1, {
        grade,
        num: updatedNewArray[grade - 1].num + num,
        students: [...updatedNewArray[grade - 1].students, ...students],
      });

      setNewGradeByStudent(updatedNewArray);
      setGradeByStudent(updatedArray);
    } else if (plusType === 'student') {
      const updatedArray = [...gradeByStudent];
      updatedArray.splice(grade - 1, 1, {
        grade,
        num: num - 1,
        students: students.filter((err) => err !== student),
      });

      const updatedNewArray = [...newClassInformation];
      updatedNewArray.splice(grade - 1, 1, {
        grade,
        num: updatedNewArray[grade - 1].num + 1,
        students: [...updatedNewArray[grade - 1].students, student],
      });

      setNewGradeByStudent(updatedNewArray);
      setGradeByStudent(updatedArray);
    }
  };

  const handleClickMinusButton = (plusType, student) => {
    if (plusType === 'grade') {
      const updatedArray = [...newClassInformation];
      updatedArray.splice(grade - 1, 1, {
        grade,
        num: 0,
        students: [],
      });

      const updatedNewArray = [...gradeByStudent];
      updatedNewArray.splice(grade - 1, 1, {
        grade,
        num: updatedNewArray[grade - 1].num + num,
        students: [...updatedNewArray[grade - 1].students, ...students],
      });

      setNewGradeByStudent(updatedArray);
      setGradeByStudent(updatedNewArray);
    } else if (plusType === 'student') {
      const updatedArray = [...newClassInformation];
      updatedArray.splice(grade - 1, 1, {
        grade,
        num: num - 1,
        students: students.filter((err) => err !== student),
      });

      const updatedNewArray = [...gradeByStudent];
      updatedNewArray.splice(grade - 1, 1, {
        grade,
        num: updatedNewArray[grade - 1].num + 1,
        students: [...updatedNewArray[grade - 1].students, student],
      });

      setNewGradeByStudent(updatedArray);
      setGradeByStudent(updatedNewArray);
    }
  };

  return (
    <div className="w-[19.68rem]">
      <button
        type="button"
        className="w-[19.68rem] h-[2.625rem] flex items-center border-solid border-b-[0.05rem] border-hpGray bg-hpLightGray"
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        <div className="w-[3.68rem]">
          <div
            className={`transition-transform w-[1.375rem] h-[1.375rem] mx-auto ${isOpen ? 'rotate-180 pr-8' : 'rotate-90 pb-8'}`}
          >
            <BsFillTriangleFill size="1.375rem" color="#BCBCBC" />
          </div>
        </div>
        <span className="w-[2.5rem] leading-[2.625rem] text-lg font-bold text-center">
          {gradeTransform(grade)}
        </span>
        <span className="w-[3.5rem] pr-2 leading-[2.625rem] text-lg text-hpLightkBlack font-bold text-center">
          {num}명
        </span>
        {type === 'plus' ? (
          <div className="w-[10rem] text-right pr-8">
            <TextButton
              color="white"
              shape="math"
              size="small"
              text="+"
              handleClick={(e) => {
                e.stopPropagation();
                handleClickPlusButton('grade');
              }}
            />
          </div>
        ) : (
          <div className="w-[10rem] text-right pr-8">
            <TextButton
              color="white"
              shape="math"
              size="small"
              text="-"
              handleClick={(e) => {
                e.stopPropagation();
                handleClickMinusButton('grade');
              }}
            />
          </div>
        )}
      </button>
      {isOpen
        ? students.map((student) => (
            <div
              className="w-[19.68rem] h-[2.625rem] flex items-center border-solid border-b-[0.05rem] border-hpGray"
              key={student}
            >
              <span className="w-[8rem] pl-14 font-bold text-sm">
                {student}
              </span>
              {type === 'plus' ? (
                <div className="w-[11.68rem] text-right pr-[2.1rem]">
                  <TextButton
                    color="white"
                    shape="math"
                    size="tooSmall"
                    text="+"
                    handleClick={() => {
                      handleClickPlusButton('student', student);
                    }}
                    moreStyle="bg-hpBlack text-white hover:border-hpBlack border-hpLightBlack"
                  />
                </div>
              ) : (
                <div className="w-[11.68rem] text-right pr-[2.1rem]">
                  <TextButton
                    color="white"
                    shape="math"
                    size="tooSmall"
                    text="-"
                    handleClick={() => {
                      handleClickMinusButton('student', student);
                    }}
                    moreStyle="bg-hpBlack text-white hover:border-hpBlack border-hpLightBlack"
                  />
                </div>
              )}
            </div>
          ))
        : null}
    </div>
  );
}

ClassDropdownList.propTypes = {
  grade: PropTypes.number.isRequired,
  num: PropTypes.number.isRequired,
  students: PropTypes.arrayOf(PropTypes.string).isRequired,
  gradeByStudent: PropTypes.arrayOf(PropTypes.shape(studentByGrade)).isRequired,
  setGradeByStudent: PropTypes.func.isRequired,
  newClassInformation: PropTypes.arrayOf(PropTypes.shape(studentByGrade))
    .isRequired,
  setNewGradeByStudent: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['plus', 'minus']).isRequired,
};

export default ClassDropdownList;
