export default function getDayInKorean(date) {
  if (date === 0) return '일';
  if (date === 1) return '월';
  if (date === 2) return '화';
  if (date === 3) return '수';
  if (date === 4) return '목';
  if (date === 5) return '금';
  if (date === 6) return '토';
  return '요일 없음';
}
