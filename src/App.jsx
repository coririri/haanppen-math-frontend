import { useState } from 'react';
import SlideBar from './components/moecules/SlideBar';

function App() {
  const [isClickArr, setIsClickArr] = useState([false, true, false, false]);
  return (
    <div className="mx-2 my-2">
      <SlideBar
        num={3}
        firstText="학생 관리"
        secondText="반 관리"
        thirdText="강사 관리"
        isClickArr={isClickArr}
        setIsClickArr={setIsClickArr}
      />
      {isClickArr[1] && <div>1번</div>}
      {isClickArr[2] && <div>2번</div>}
      {isClickArr[3] && <div>3번</div>}
    </div>
  );
}

export default App;
