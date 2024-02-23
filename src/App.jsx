import { useState } from 'react';
import StudentManagementList from './components/moecules/StudentManagementList';

function App() {
  const [, setDeletedIndexArr] = useState(Array(3).fill(false));
  const studentInformationArr = [
    {
      grade: 11,
      name: '조인애',
      phoneNumber: '010-3433-0652',
    },
    {
      grade: 7,
      name: '김민아',
      phoneNumber: '010-3423-0652',
    },
  ];
  return (
    <div>
      <StudentManagementList
        studentInformationArr={studentInformationArr}
        setDeletedIndexArr={setDeletedIndexArr}
        index={0}
      />
      <StudentManagementList
        studentInformationArr={studentInformationArr}
        setDeletedIndexArr={setDeletedIndexArr}
        index={1}
      />
    </div>
  );
}

export default App;
