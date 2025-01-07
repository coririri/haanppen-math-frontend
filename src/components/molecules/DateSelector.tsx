import React, { useState, useRef } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { getDay, getYear, getMonth } from 'date-fns'; // date-fns에서 유틸리티 함수 임포트
import { ko } from 'date-fns/locale'; // 한국어 로케일을 가져옵니다.
import DatePicker from 'react-datepicker';
import { LiaCalendarCheck } from 'react-icons/lia';
import { useNavigate } from 'react-router-dom';
import dateTimeToDate from '../../utils/dateTimeToDate';
import { CourseType } from '../../types/courseType';

interface DateSelectorProps {
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  courseList: CourseType[];
  selectedClassindex: number;
}

function DateSelector({
  startDate,
  setStartDate,
  courseList,
  selectedClassindex,
}: DateSelectorProps) {
  const [currentDate, setCurrentDate] = useState(startDate);
  const navigate = useNavigate();

  const calendar = useRef<any>(null);

  const cancelDatePicker = () => {
    setCurrentDate(startDate);
    calendar.current.setOpen(false);
  };

  const openDatePicker = () => {
    calendar.current.setOpen(true);
  };

  const closeDatePicker = () => {
    setStartDate(currentDate);
    calendar.current.setOpen(false);
    navigate(
      `/lesson?date=${dateTimeToDate(currentDate)}&courseId=${courseList[selectedClassindex].courseId}&courseName=${courseList[selectedClassindex].courseName}`,
    );
  };

  const MONTHS = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ];

  // 일요일에 빨간색을 적용하는 함수
  const highlightSunday = (date: Date) => (getDay(date) === 0 ? 'sunday' : ''); // 일요일(0)인 경우 'sunday' 클래스 할당

  // 날짜와 이벤트를 처리하는 핸들러 함수
  const datePickHandler = (date: Date) => {
    // setStartDate(date);
    // searchParams.set('date', date);
    // setSearchParams(searchParams);
    setCurrentDate(date);
  };

  return (
    <div className="relative">
      {/* 날짜 선택 버튼 */}
      <button
        type="button"
        onClick={openDatePicker}
        className="bg-hpBlue px-4 py-1 rounded-lg flex items-center justify-center"
      >
        <LiaCalendarCheck
          size="1.5rem"
          className="mb-[2px] mr-1"
          color="white"
        />
        <span className="font-bold text-lg ml-1 text-white">날짜 선택</span>
      </button>
      <DatePicker
        withPortal
        className="date date-record hidden"
        locale={ko}
        selected={startDate}
        dateFormat="yyyy.MM.dd(eee)"
        useWeekdaysShort
        shouldCloseOnSelect={false}
        ref={calendar}
        onInputClick={() => openDatePicker()}
        onChange={(date) => {
          if (date !== null) datePickHandler(date);
        }}
        dayClassName={highlightSunday} // 일요일에 스타일 적용
        renderCustomHeader={({
          date,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
          decreaseMonth,
          increaseMonth,
        }) => (
          <div className="m-2 flex justify-center items-center">
            <button
              type="button"
              className="btn_month btn_month-prev"
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
            >
              <AiOutlineLeft size="1.1rem" />
            </button>
            <div className="font-bold text-xl mx-6">
              {getYear(date)}.{MONTHS[getMonth(date)]}
            </div>
            <button
              type="button"
              className="btn_month btn_month-next"
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
            >
              <AiOutlineRight size="1.1rem" />
            </button>
          </div>
        )}
      >
        <div className="mt-6 mb-6 flex justify-center items-center">
          <button
            type="button"
            onClick={cancelDatePicker}
            className="font-bold text-lg bg-gray-200 text-gray-500 px-6 py-1 rounded-xl mr-3"
          >
            취소
          </button>
          <button
            type="button"
            onClick={closeDatePicker}
            className="font-bold text-lg bg-yellow-400 text-black-500 px-6 py-1 rounded-xl ml-3"
          >
            선택
          </button>
        </div>
      </DatePicker>
    </div>
  );
}

export default DateSelector;
