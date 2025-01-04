import instance from './instance';

const uploadImageToS3 = async (formdata: FormData) =>
  instance.post('/api/media/image', formdata, {
    headers: {
      'Content-Type': 'multipart/form-data', // Content-Type을 반드시 이렇게 하여야 한다.
    },
  });

export default uploadImageToS3;
