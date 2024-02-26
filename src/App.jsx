import { useState } from 'react';
import ClassManagementList from './components/molecules/ClassManagementList';

function App() {
  const [, setDeletedIndexArr] = useState([]);
  // const studentInformationArr = [
  //   {
  //     grade: 11,
  //     name: '조인애',
  //     phoneNumber: '010-3433-0652',
  //   },
  //   {
  //     grade: 7,
  //     name: '김민아',
  //     phoneNumber: '010-3423-0652',
  //   },
  // ];
  return (
    <div>
      {/* <ClassManagementList
        setDeletedIndexArr={setDeletedIndexArr}
        index={0}
        checked={false}
      /> */}
      <ClassManagementList
        setDeletedIndexArr={setDeletedIndexArr}
        index={0}
        checked={false}
      />
    </div>
  );
}

export default App;
