export default function secondToTime(seconds: number | undefined) {
  if (seconds === undefined) return `기록 없음`;
  const hours = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');

  return `${hours}:${minutes}:${secs}`;
}
