import instance from './instance';

const enrollVideo = (formData: FormData) =>
  instance.post('/api/directory/media', formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // Content-Type을 반드시 이렇게 하여야 한다.
    },
  });

export const deleteVideo = (mediaSrc: string) =>
  instance.delete(`/api/directory/media?mediaSrc=${mediaSrc}`);

export default enrollVideo;
