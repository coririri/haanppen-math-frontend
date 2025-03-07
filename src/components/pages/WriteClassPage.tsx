import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import WriteOfflineClassPage from './WriteOfflineClassPage';
import WriteOnlineClassPage from './WriteOnlineClassPage';
import SlideBar from '../molecules/SlideBar';

function WriteClassPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [classTypeArr, setClassArrType] = useState<boolean[]>(() => {
    if (searchParams.get('classType') === 'offline') return [true, false];
    return [false, true];
  });

  useEffect(() => {
    if (classTypeArr[0] === true) {
      searchParams.set('classType', 'offline');
      setSearchParams(searchParams);
    } else {
      searchParams.set('classType', 'online');
      setSearchParams(searchParams);
    }
  }, [classTypeArr]);

  return (
    <div className="flex flex-col items-center justify-center mt-2">
      <SlideBar
        num={2}
        firstText="학원강좌"
        secondText="단과강좌"
        isClickArr={classTypeArr}
        setIsClickArr={setClassArrType}
      />
      <div className="mt-4">
        {classTypeArr[0] ? (
          <WriteOfflineClassPage
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        ) : (
          <WriteOnlineClassPage
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        )}
      </div>
    </div>
  );
}

export default WriteClassPage;
