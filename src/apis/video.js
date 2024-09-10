import instance from './instance';

const enrollVideo = (formData) =>
  instance.post('/api/directory/media', formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // Content-Type을 반드시 이렇게 하여야 한다.
    },
  });

export default enrollVideo;
