import { useState } from 'react';
import StudentManagementList from './components/moecules/StudentManagementList';

function App() {
  const [, setDeletedIndexArr] = useState(Array(3).fill(0));
  return (
    <div>
      <StudentManagementList
        grade="고2"
        name="조인애"
        phoneNumber="010-3433-0652"
        setDeletedIndexArr={setDeletedIndexArr}
        index={1}
      />
      <StudentManagementList
        grade="중1"
        name="김민아"
        phoneNumber="010-3423-0652"
        setDeletedIndexArr={setDeletedIndexArr}
        index={2}
      />
    </div>
  );
}

export default App;
