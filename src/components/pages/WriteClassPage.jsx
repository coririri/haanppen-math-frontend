import React, { useState } from 'react';
import WriteOfflineClassPage from './WriteOfflineClassPage';
import WriteOnlineClassPage from './WriteOnlineClassPage';
import SlideBar from '../molecules/SlideBar';

function WriteClassPage() {
  const [classTypeArr, setClassArrType] = useState([true, false]);

  return (
    <div className="flex flex-col items-center justify-center mt-2">
      <SlideBar
        num={2}
        firstText="오프라인 수업"
        secondText="온라인 수업"
        isClickArr={classTypeArr}
        setIsClickArr={setClassArrType}
      />

      {classTypeArr[0] ? <WriteOfflineClassPage /> : <WriteOnlineClassPage />}
    </div>
  );
}

export default WriteClassPage;
