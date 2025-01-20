/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ClassDetailTab from '../organisms/ClassDetailTab';
import VideoListTab from '../organisms/VideoListTab';
import DropdownMenu from '../molecules/DropdownMenu';
import Canlendar from '../molecules/Canlendar';
import { getOwnCourses } from '../../apis/course';
import dateTimeToDate, {
  dateTimeToDateAndZeroTimes,
} from '../../utils/dateTimeToDate';
import { getLessonByDateAndCourse } from '../../apis/lesson';
import { CourseType } from '../../types/courseType';
import { VideoType } from '../../types/videoType';

function WriteOfflineClassPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [courseList, setCourseList] = useState<CourseType[]>([]);
  const [selectedClassindex, setSelectedClassindex] = useState<number>(
    Number(searchParams.get('classIndex')),
  );
  const [startDate, setStartDate] = useState<Date>(() => {
    const dateStr = searchParams.get('date') ?? '';
    const date = new Date(dateStr);

    // 원하는 형식으로 날짜 포맷
    const formattedDate = date.toISOString(); // "YYYY-MM-DD" 형식으로
    console.log(formattedDate.split('T')[0]); // 2025-01-14
    return new Date(formattedDate.split('T')[0]);
  });
  const [classDetailData, setClassDetailData] = useState<{
    id?: number;
    title: string;
    content: string;
  }>({
    id: -1,
    title: '',
    content: '',
  });
  const [videoData, setVideoData] = useState<VideoType[]>([]);
  const [isCreated, setIsCreated] = useState<boolean>(false);
  const [deleteCheckArr, setDeleteCheckArr] = useState<boolean[]>(
    Array(videoData.length).fill(false),
  );

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
        courseList[Number(selectedClassindex)]?.courseId,
        dateTimeToDate(
          new Date(dateTimeToDateAndZeroTimes(new Date(startDate))),
        ),
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
    if (startDate && courseList[Number(selectedClassindex)]?.courseId) {
      fetchData();
    }
  }, [startDate, courseList[Number(selectedClassindex)]?.courseId, isCreated]);

  useEffect(() => {
    setSelectedClassindex(Number(searchParams.get('classIndex')));
  }, [searchParams.get('classIndex')]);

  useEffect(() => {
    const dateStr = searchParams.get('date') ?? '';
    const date = new Date(dateStr);

    // 원하는 형식으로 날짜 포맷
    const formattedDate = date.toISOString(); // "YYYY-MM-DD" 형식으로
    console.log(formattedDate); // 2025-01-14
    setStartDate(new Date(formattedDate.split('T')[0]));
  }, [searchParams.get('date')]);
  console.log(startDate);
  return (
    <div className=" mx-auto">
      <div>
        <div className="flex justify-center mt-4">
          <div className="relative inline-block">
            <DropdownMenu
              type="search"
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
      </div>
      {isCreated ? (
        <div className="flex justify-center my-6">
          <ClassDetailTab
            classId={classDetailData.id ?? -1}
            classDetailData={classDetailData}
            setClassDetailData={setClassDetailData}
            isCreated={isCreated}
            setIsCreated={setIsCreated}
            startDate={startDate}
            courseList={courseList}
            selectedClassindex={selectedClassindex}
          />
          <div className="w-[10px] h-[600px] bg-gray-200 mx-12 my-6" />
          <VideoListTab
            videoData={videoData}
            setVideoData={setVideoData}
            memoId={classDetailData.id ?? -1}
            startDate={startDate}
            selectedClassindex={selectedClassindex}
            courseId={courseList[Number(selectedClassindex)]?.courseId}
            deleteCheckArr={deleteCheckArr}
            setDeleteCheckArr={setDeleteCheckArr}
          />
        </div>
      ) : (
        <div>
          <ClassDetailTab
            classId={classDetailData.id ?? -1}
            classDetailData={classDetailData}
            setClassDetailData={setClassDetailData}
            isCreated={isCreated}
            setIsCreated={setIsCreated}
            startDate={startDate}
            courseList={courseList}
            selectedClassindex={selectedClassindex}
          />
        </div>
      )}
    </div>
  );
}

export default WriteOfflineClassPage;
