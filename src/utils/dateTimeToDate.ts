const dateTimeToDate = (dateTimeString: Date): string => {
  const date = new Date(dateTimeString);

  // 연, 월, 일 추출
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = String(date.getDate()).padStart(2, '0');

  // 원하는 형식으로 문자열 생성
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate; // 출력: 2024-07-13
};

export const dateTimeToDateAndTimes = (dateTimeString: Date): string => {
  const date = new Date(dateTimeString);

  // 연, 월, 일 추출
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = String(date.getDate()).padStart(2, '0');

  // 시, 분, 초 추출
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // 원하는 형식으로 문자열 생성
  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDateTime; // 예: "2024-09-03 09:42:32"
};

export const dateTimeToDateAndZeroTimes = (dateTimeString: Date): string => {
  console.log(dateTimeString);
  // 월 이름과 숫자 매핑
  const monthMap = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  const monthEng = dateTimeString.toString().split(' ')[1] as
    | 'Jan'
    | 'Feb'
    | 'Mar'
    | 'Apr'
    | 'May'
    | 'Jun'
    | 'Jul'
    | 'Aug'
    | 'Sep'
    | 'Oct'
    | 'Nov'
    | 'Dec';

  const utcDate = new Date(
    Date.UTC(
      Number(dateTimeString.toString().split(' ')[3]),
      Number(monthMap[monthEng]),
      Number(dateTimeString.toString().split(' ')[2]),
    ),
  ); // UTC로 설정

  // 연, 월, 일 추출
  const year = utcDate.getFullYear();
  const month = String(utcDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = String(utcDate.getDate()).padStart(2, '0');

  // 원하는 형식으로 문자열 생성
  const formattedDateTime = `${year}-${month}-${day} 18:32:03`;
  console.log(formattedDateTime);
  return formattedDateTime; // 예: "2024-09-03 09:42:32"
};

export const formatDate = (dateString: Date): string => {
  const date = new Date(dateString);

  const year = String(date.getFullYear()); // 연도에서 마지막 두 자리 추출
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월 (0부터 시작하므로 +1 필요)
  const day = String(date.getDate()).padStart(2, '0'); // 날짜

  return `${year}-${month}-${day}`;
};

export default dateTimeToDate;
