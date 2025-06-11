const getVideoDuration = (file: File): Promise<number> =>
  new Promise((resolve) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.src = URL.createObjectURL(file);

    video.onloadedmetadata = () => {
      resolve(video.duration); // 영상 길이 반환
      URL.revokeObjectURL(video.src); // 메모리 누수 방지
    };
  });

export default getVideoDuration;
