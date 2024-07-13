import instance from './instance';

const fetchImage = async (imageUrl) => {
  try {
    const response = await instance.get(`/api/media/${imageUrl}`);
    return response.data;
  } catch (e) {
    console.error(e);
    throw e; // 에러 발생 시 예외를 다시 던져 호출자가 처리하도록 합니다.
  }
};

export default fetchImage;
