import { useState } from 'react';
import SlideBar from './components/moecules/SlideBar';

function App() {
  const [isClickArr, setIsClickArr] = useState([false, true, false]);
  return (
    <div className="mx-2 my-2">
      <SlideBar
        num={2}
        firstText="학생 관리"
        secondText="반 관리"
        isClickArr={isClickArr}
        setIsClickArr={setIsClickArr}
      />
      {isClickArr[1] && <div>1번</div>}
      {isClickArr[2] && <div>2번</div>}
    </div>
  );
}

export default App;
