/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ClassDetailTab from '../organisms/ClassDetailTab';
import VideoListTab from '../organisms/VideoListTab';
import ClassDropdownMenu from '../molecules/ClassDropdownMenu';
import Canlendar from '../molecules/Canlendar';
import { getOwnCourses } from '../../apis/course';
import dateTimeToDate from '../../utils/dateTimeToDate';
import { getLessonByDateAndCourse } from '../../apis/lesson';

function WriteClassPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [courseList, setCourseList] = useState([]);
  const [selectedClassindex, setSelectedClassindex] = useState(
    searchParams.get('classIndex'),
  );
  const [startDate, setStartDate] = useState(searchParams.get('date'));
  const [classDetailData, setClassDetailData] = useState({
    id: -1,
    title: '',
    content: '',
  });
  const [videoData, setVideoData] = useState([]);
  const [isCreated, setIsCreated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getOwnCourses();
      setCourseList(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getLessonByDateAndCourse(
        courseList[selectedClassindex]?.courseId,
        dateTimeToDate(startDate),
      );
      if (response.status === 200) {
        const { data } = response;
        setIsCreated(true);
        setClassDetailData({
          id: data.memoId,
          title: data.progressed,
          content: data.homework,
        });
        setVideoData(data.memoMediaViews);
      } else {
        setIsCreated(false);
        setClassDetailData({
          title: '',
          content: '',
        });
        setVideoData([]);
      }
    };
    if (startDate && courseList[selectedClassindex]?.courseId) {
      fetchData();
    }
  }, [startDate, courseList[selectedClassindex]?.courseId]);

  useEffect(() => {
    setSelectedClassindex(searchParams.get('classIndex'));
  }, [searchParams.get('classIndex')]);

  useEffect(() => {
    setStartDate(searchParams.get('date'));
  }, [searchParams.get('date')]);

  return (
    <div className="w-[950px] mx-auto">
      <div>
        <div className="flex justify-center mt-4">
          <div className="relative inline-block">
            <ClassDropdownMenu
              textArr={courseList.map((course) => course.courseName)}
              selectedIndex={selectedClassindex}
              setSelectedIndex={setSelectedClassindex}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          </div>
          <div className="ml-6">
            <Canlendar
              startDate={startDate}
              setStartDate={setStartDate}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          </div>
        </div>
        <ClassDetailTab
          classId={classDetailData.id}
          classDetailData={classDetailData}
          setClassDetailData={setClassDetailData}
          isCreated={isCreated}
          setIsCreated={setIsCreated}
          startDate={startDate}
          courseList={courseList}
          selectedClassindex={selectedClassindex}
        />
      </div>
      {isCreated && (
        <div>
          <VideoListTab
            videoData={videoData}
            setVideoData={setVideoData}
            memoId={classDetailData.id}
            startDate={startDate}
            selectedClassindex={selectedClassindex}
          />
        </div>
      )}
    </div>
  );
}

export default WriteClassPage;
