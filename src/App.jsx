import { useState } from 'react';
import ClassDropdown from './components/organisms/ClassDropdown';

function App() {
  const [classInformation, setGradeByStudent] = useState([
    {
      grade: 1,
      num: 0,
      students: [],
    },
    {
      grade: 2,
      num: 1,
      students: ['김땡땡'],
    },
    {
      grade: 3,
      num: 3,
      students: ['이땡땡', '선땡땡', '주땡땡'],
    },
    {
      grade: 4,
      num: 5,
      students: ['후땡땡', '알땡땡', '쿠땡땡', '냥땡땡', '뿌뿌뿌'],
    },
    {
      grade: 5,
      num: 5,
      students: ['후땡땡', '알땡땡', '쿠땡땡', '냥땡땡', '뿌뿌뿌'],
    },
    {
      grade: 6,
      num: 0,
      students: [],
    },
    {
      grade: 7,
      num: 2,
      students: ['냥땡땡', '뿌뿌뿌'],
    },
    {
      grade: 8,
      num: 0,
      students: [],
    },
    {
      grade: 9,
      num: 0,
      students: [],
    },
    {
      grade: 10,
      num: 0,
      students: [],
    },
    {
      grade: 11,
      num: 0,
      students: [],
    },
    {
      grade: 12,
      num: 0,
      students: [],
    },
  ]);

  const [newClassInformation, setNewGradeByStudent] = useState([
    {
      grade: 1,
      num: 0,
      students: [],
    },
    {
      grade: 2,
      num: 0,
      students: [],
    },
    {
      grade: 3,
      num: 0,
      students: [],
    },
    {
      grade: 4,
      num: 0,
      students: [],
    },
    {
      grade: 5,
      num: 0,
      students: [],
    },
    {
      grade: 6,
      num: 0,
      students: [],
    },
    {
      grade: 7,
      num: 0,
      students: [],
    },
    {
      grade: 8,
      num: 0,
      students: [],
    },
    {
      grade: 9,
      num: 0,
      students: [],
    },
    {
      grade: 10,
      num: 0,
      students: [],
    },
    {
      grade: 11,
      num: 0,
      students: [],
    },
    {
      grade: 12,
      num: 0,
      students: [],
    },
  ]);

  return (
    <div className="m-4 flex ">
      <ClassDropdown
        gradeByStudent={classInformation}
        setGradeByStudent={setGradeByStudent}
        newClassInformation={newClassInformation}
        setNewGradeByStudent={setNewGradeByStudent}
        type="plus"
      />
      <div className="ml-4">
        <ClassDropdown
          gradeByStudent={classInformation}
          setGradeByStudent={setGradeByStudent}
          newClassInformation={newClassInformation}
          setNewGradeByStudent={setNewGradeByStudent}
          type="minus"
        />
      </div>
    </div>
  );
}

export default App;
