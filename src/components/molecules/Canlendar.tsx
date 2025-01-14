import React, { useState, useRef } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { getDay, getYear, getMonth, addDays, subDays } from 'date-fns'; // date-fns에서 유틸리티 함수 임포트
import { BsFillTriangleFill } from 'react-icons/bs';
import { ko } from 'date-fns/locale'; // 한국어 로케일을 가져옵니다.
import DatePicker from 'react-datepicker';
import { dateTimeToDateAndZeroTimes } from '../../utils/dateTimeToDate';

interface CanlendarType {
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
}

function Canlendar({
  startDate,
  setStartDate,
  searchParams,
  setSearchParams,
}: CanlendarType) {
  const [currentDate, setCurrentDate] = useState<Date>(startDate);

  const calendar = useRef<any>(null);

  const cancelDatePicker = () => {
    setCurrentDate(startDate);
    if (calendar.current) {
      calendar.current.setOpen(false); // null이 아닌 경우에만 호출
    }
  };

  const openDatePicker = () => {
    if (calendar.current) {
      calendar.current.setOpen(true);
    }
  };

  const closeDatePicker = () => {
    setStartDate(currentDate);
    searchParams.set('date', currentDate.toString());
    setSearchParams(searchParams);
    calendar.current.setOpen(false);
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
  console.log(dateTimeToDateAndZeroTimes(startDate));
  console.log(new Date(dateTimeToDateAndZeroTimes(startDate)));
  return (
    <div className="relative">
      <button
        className="absolute top-3 left-4 z-10"
        type="button"
        aria-label="왼쪽 넘기기"
        onClick={() => {
          setStartDate((prevDate) =>
            subDays(new Date(dateTimeToDateAndZeroTimes(prevDate)), 1),
          ); // 현재 날짜에서 하루를 빼서 업데이트

          searchParams.set(
            'date',
            subDays(
              new Date(dateTimeToDateAndZeroTimes(startDate)),
              1,
            ).toString(),
          );
          setSearchParams(searchParams);
          setCurrentDate((prevDate) =>
            subDays(new Date(dateTimeToDateAndZeroTimes(prevDate)), 1),
          );
        }}
      >
        <BsFillTriangleFill
          className="origin-center rotate-[270deg]"
          size="20px"
          color="#BCBCBC"
        />
      </button>
      <DatePicker
        withPortal
        className="date date-record"
        locale={ko}
        selected={new Date(dateTimeToDateAndZeroTimes(startDate))}
        // selected={new Date()}
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
      <button
        className="absolute top-3 left-[12.5rem] z-20"
        type="button"
        aria-label="왼쪽 넘기기"
        onClick={() => {
          setStartDate((prevDate) =>
            addDays(new Date(dateTimeToDateAndZeroTimes(prevDate)), 1),
          ); // 현재 날짜에서 하루를 더해서 업데이트
          searchParams.set(
            'date',
            addDays(
              new Date(dateTimeToDateAndZeroTimes(startDate)),
              1,
            ).toString(),
          );
          setSearchParams(searchParams);
          setCurrentDate((prevDate) =>
            addDays(new Date(dateTimeToDateAndZeroTimes(prevDate)), 1),
          );
        }}
      >
        <BsFillTriangleFill
          className="origin-center rotate-[90deg]"
          size="20px"
          color="#BCBCBC"
        />
      </button>
    </div>
  );
}

export default Canlendar;
