const dateTimeToDate = (dateTimeString) => {
  const date = new Date(dateTimeString);

  // 연, 월, 일 추출
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = String(date.getDate()).padStart(2, '0');

  // 원하는 형식으로 문자열 생성
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate; // 출력: 2024-07-13
};

export const dateTimeToDateAndTimes = (dateTimeString) => {
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

export const dateTimeToDateAndZeroTimes = (dateTimeString) => {
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

  const utcDate = new Date(
    Date.UTC(
      dateTimeString.toString().split(' ')[3],
      monthMap[dateTimeString.toString().split(' ')[1]],
      dateTimeString.toString().split(' ')[2],
    ),
  ); // UTC로 설정

  // 연, 월, 일 추출
  const year = utcDate.getFullYear();
  const month = String(utcDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = String(utcDate.getDate()).padStart(2, '0');

  // 원하는 형식으로 문자열 생성
  const formattedDateTime = `${year}-${month}-${day} 18:32:03`;

  return formattedDateTime; // 예: "2024-09-03 09:42:32"
};

export default dateTimeToDate;
