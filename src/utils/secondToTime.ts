export default function secondToTime(seconds: number | undefined) {
  if (seconds === undefined) return `기록 없음`;
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${hours}시간 ${minutes}분 ${secs}초`;
}
