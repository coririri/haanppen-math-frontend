import { useState } from 'react';
import DropdownMenu from './components/moecules/DropdownMenu';

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className="mx-2 my-2">
      <DropdownMenu
        // textArr={[
        //   '[강의실1] 다이나믹듀오와 함께하는 힙합 수업',
        //   '중1',
        //   '중2',
        //   '중3',
        //   '고1',
        //   '고2',
        // ]}
        // textArr={[
        //   '[강의실1] 다이나믹듀오와 함께하는 힙합 수업',
        //   '[강의실2] 화 25',
        //   '[강의실3] 월 35',
        //   '[강의실4] 화 45',
        //   '[강의실5] 월 55',
        //   '[강의실6] 화 65',
        // ]}
        textArr={[
          'Theme 1. 등차수열의 대칭성과 합의 구조',
          'Theme 2. 등차수열의 대칭성과 합의 구조',
          'Theme 3. 등차수열의 대칭성과 합의 구조와 등차수열의 끝은 어디인가에 대한 한석원 교수님의 타고난 통찰과 이루어질수 없는 모발과의 만남은 무엇일까?ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ',
          'Theme 4. 등차수열의 대칭성과 합의 구조',
          'Theme 5. 등차수열의 대칭성과 합의 구조',
          'Theme 6. 등차수열의 대칭성과 합의 구조',
        ]}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        size="long"
      />
      <div>{selectedIndex}</div>
    </div>
  );
}

export default App;
