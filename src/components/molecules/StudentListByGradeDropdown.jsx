import { useState } from 'react';
import { BsTriangleFill } from 'react-icons/bs';
import gradeTransform from '../../utils/gradeTransform';

function StudentListByGradeDropdown({
  type,
  grade,
  students,
  differntCourseStudents,
  myCourseStudents,
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
                  students.forEach((student) => {
                    tempMyCourseStudents[grade - 1].students.push(student);
                  });
                  console.log(tempMyCourseStudents);

                  const tempDifferntCourseStudents = [
                    ...differntCourseStudents,
                  ];
                  tempDifferntCourseStudents[grade - 1].students = [];
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

                    const tempDifferntCourseStudents = [
                      ...differntCourseStudents,
                    ];
                    tempDifferntCourseStudents[grade - 1].students =
                      tempDifferntCourseStudents[grade - 1].students.filter(
                        (tempStudent) => {
                          if (student.studentName !== tempStudent.studentName) {
                            return tempStudent;
                          }
                          return '';
                        },
                      );
                    console.log(tempDifferntCourseStudents);
                  }}
                >
                  <div className="w-full h-full flex items-center justify-between">
                    <div className="ml-4">
                      <span className="text-md ml-8">
                        {student.studentName}
                      </span>
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
                students.forEach((student) => {
                  tempDifferntCourseStudents[grade - 1].students.push(student);
                });
                console.log(tempDifferntCourseStudents);

                const tempMyCourseStudents = [...myCourseStudents];
                tempMyCourseStudents[grade - 1].students = [];
                console.log(tempMyCourseStudents);
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

                  const tempMyCourseStudents = [...myCourseStudents];
                  tempMyCourseStudents[grade - 1].students =
                    tempMyCourseStudents[grade - 1].students.filter(
                      (tempStudent) => {
                        if (student.studentName !== tempStudent.studentName) {
                          return tempStudent;
                        }
                        return '';
                      },
                    );
                  console.log(tempMyCourseStudents);
                }}
              >
                <div className="w-full h-full flex items-center justify-between">
                  <div className="ml-4">
                    <span className="text-md ml-8">{student.studentName}</span>
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
