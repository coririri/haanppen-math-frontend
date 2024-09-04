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

export default dateTimeToDate;
