/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import ClassDetailTab from '../organisms/ClassDetailTab';
import VideoListTab from '../organisms/VideoListTab';
import Carousel from '../molecules/Carousel';
import Canlendar from '../molecules/Canlendar';

function WriteClassPage() {
  const [classList] = useState(['반1', '반2']);
  const [selectedClassindex, setSelectedClassindex] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [classDetailData, setClassDetailData] = useState({
    title: '',
    desc: '',
  });
  const [isCreated, setIsCreated] = useState(false);
  return (
    <div className="w-[950px] mx-auto">
      <div>
        <div className="flex justify-center mt-4">
          <div className="mr-6">
            <Carousel
              dataList={classList}
              selectedDataindex={selectedClassindex}
              setSelectedDataindex={setSelectedClassindex}
            />
          </div>
          <div className="ml-6">
            <Canlendar startDate={startDate} setStartDate={setStartDate} />
          </div>
        </div>
        <ClassDetailTab
          classDetailData={classDetailData}
          setClassDetailData={setClassDetailData}
          isCreated={isCreated}
          setIsCreated={setIsCreated}
        />
      </div>
      {isCreated && (
        <div>
          <VideoListTab />
        </div>
      )}
    </div>
  );
}

export default WriteClassPage;
