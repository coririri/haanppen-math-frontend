import { useState } from 'react';
import { BsTriangleFill } from 'react-icons/bs';
import gradeTransform from '../../utils/gradeTransform';

function StudentListByGradeDropdown({
  type,
  grade,
  students,
  differntCourseStudents,
  myCourseStudents,
  setDifferntCourseStudents,
  setMyCourseStudents,
  setMyStudentsNum,
  setDifferentStudentsNum,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (type === 'entire') {
    return (
      <div className="w-full">
        <div className="w-full h-[40px] font-bold">
          <div className="w-full h-full">
            <div className="w-full h-full flex items-center justify-between">
              <button
                className="flex items-center"
                type="button"
                onClick={() => {
                  setIsDropdownOpen((prev) => !prev);
                }}
              >
                <div className="ml-4">
                  <BsTriangleFill
                    color="#BCBCBC"
                    size="1rem"
                    className={`${isDropdownOpen ? 'rotate-180' : 'rotate-90'}`}
                  />
                </div>
                <div className="ml-4">
                  <span className="text-md mr-2">{gradeTransform(grade)}</span>
                  <span className="text-md text-hpLightkBlack">
                    {students.length}명
                  </span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => {
                  const tempMyCourseStudents = [...myCourseStudents];
                  let changingStudentsNums = 0;
                  students.forEach((student) => {
                    tempMyCourseStudents[grade - 1].students.push(student);
                    changingStudentsNums += 1;
                  });
                  console.log(tempMyCourseStudents);
                  setMyCourseStudents(tempMyCourseStudents);

                  const tempDifferntCourseStudents = [
                    ...differntCourseStudents,
                  ];
                  tempDifferntCourseStudents[grade - 1].students = [];
                  setDifferntCourseStudents(tempDifferntCourseStudents);
                  setMyStudentsNum((prev) => prev + changingStudentsNums);
                  setDifferentStudentsNum(
                    (prev) => prev - changingStudentsNums,
                  );
                  console.log(tempDifferntCourseStudents);
                }}
              >
                <div className="mr-4 bg-[#BCF7FF] px-2 rounded-xl">
                  <span className="text-xl">
                    {type === 'entire' ? '+' : '-'}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
        <hr className="h-[0.8px] bg-hpGray w-full" />
        {isDropdownOpen &&
          students.map((student) => (
            <div key={student.studentId}>
              <div className="bg-white">
                <button
                  type="button"
                  className="w-full h-[40px] font-bold"
                  onClick={() => {
                    const tempMyCourseStudents = [...myCourseStudents];
                    tempMyCourseStudents[grade - 1].students.push(student);
                    console.log(tempMyCourseStudents);
                    setMyCourseStudents(tempMyCourseStudents);

                    const tempDifferntCourseStudents = [
                      ...differntCourseStudents,
                    ];
                    tempDifferntCourseStudents[grade - 1].students =
                      tempDifferntCourseStudents[grade - 1].students.filter(
                        (tempStudent) => {
                          if (student.name !== tempStudent.name) {
                            return tempStudent;
                          }
                          return '';
                        },
                      );
                    console.log(tempDifferntCourseStudents);
                    setDifferntCourseStudents(tempDifferntCourseStudents);
                    setMyStudentsNum((prev) => prev + 1);
                    setDifferentStudentsNum((prev) => prev - 1);
                  }}
                >
                  <div className="w-full h-full flex items-center justify-between">
                    <div className="ml-4">
                      <span className="text-md ml-8">{student.name}</span>
                    </div>
                    <div className="mr-[18px] bg-hpLightkBlack px-2 rounded-xl">
                      <span className="text-sm text-white">
                        {type === 'entire' ? '+' : '-'}
                      </span>
                    </div>
                  </div>
                </button>
                <hr className="h-[0.8px] bg-hpGray w-full" />
              </div>
            </div>
          ))}
      </div>
    );
  }
  return (
    <div className="w-full">
      <div className="w-full h-[40px] font-bold">
        <div className="w-full h-full">
          <div className="w-full h-full flex items-center justify-between">
            <button
              className="flex items-center"
              type="button"
              onClick={() => {
                setIsDropdownOpen((prev) => !prev);
              }}
            >
              <div className="ml-4">
                <BsTriangleFill
                  color="#BCBCBC"
                  size="1rem"
                  className={`${isDropdownOpen ? 'rotate-180' : 'rotate-90'}`}
                />
              </div>
              <div className="ml-4">
                <span className="text-md mr-2">{gradeTransform(grade)}</span>
                <span className="text-md text-hpLightkBlack">
                  {students.length}명
                </span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => {
                const tempDifferntCourseStudents = [...differntCourseStudents];
                let changingStudentsNums = 0;
                students.forEach((student) => {
                  tempDifferntCourseStudents[grade - 1].students.push(student);
                  changingStudentsNums += 1;
                });
                console.log(tempDifferntCourseStudents);
                setDifferntCourseStudents(tempDifferntCourseStudents);

                const tempMyCourseStudents = [...myCourseStudents];
                tempMyCourseStudents[grade - 1].students = [];
                console.log(tempMyCourseStudents);
                setMyCourseStudents(tempMyCourseStudents);
                setDifferentStudentsNum((prev) => prev + changingStudentsNums);
                setMyStudentsNum((prev) => prev - changingStudentsNums);
              }}
            >
              <div className="mr-4 bg-[#BCF7FF] px-2 rounded-xl">
                <span className="text-xl">{type === 'entire' ? '+' : '-'}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
      <hr className="h-[0.8px] bg-hpGray w-full" />
      {isDropdownOpen &&
        students.map((student) => (
          <div key={student.studentId}>
            <div className="bg-white">
              <button
                type="button"
                className="w-full h-[40px] font-bold"
                onClick={() => {
                  const tempDifferntCourseStudents = [
                    ...differntCourseStudents,
                  ];
                  tempDifferntCourseStudents[grade - 1].students.push(student);
                  console.log(tempDifferntCourseStudents);
                  setDifferntCourseStudents(tempDifferntCourseStudents);

                  const tempMyCourseStudents = [...myCourseStudents];
                  tempMyCourseStudents[grade - 1].students =
                    tempMyCourseStudents[grade - 1].students.filter(
                      (tempStudent) => {
                        if (student.name !== tempStudent.name) {
                          return tempStudent;
                        }
                        return '';
                      },
                    );
                  console.log(tempMyCourseStudents);
                  setMyCourseStudents(tempMyCourseStudents);
                  setDifferentStudentsNum((prev) => prev + 1);
                  setMyStudentsNum((prev) => prev - 1);
                }}
              >
                <div className="w-full h-full flex items-center justify-between">
                  <div className="ml-4">
                    <span className="text-md ml-8">{student.name}</span>
                  </div>
                  <div className="mr-[18px] bg-hpLightkBlack px-2 rounded-xl">
                    <span className="text-sm text-white">
                      {type === 'entire' ? '+' : '-'}
                    </span>
                  </div>
                </div>
              </button>
              <hr className="h-[0.8px] bg-hpGray w-full" />
            </div>
          </div>
        ))}
    </div>
  );
}

export default StudentListByGradeDropdown;
