import { AxiosResponse } from 'axios';
import instance from './instance';

export const getRequiredChunks = () => instance.get('/api/v2/media/chunks');

interface CombineChunksResponse {
  mediaSrc: string;
  // 다른 필드가 있다면 추가
}

export const combineChunks = (
  uniqueId: string,
  userDefinedFileName: string,
  extension: string,
  fileSize: number,
  duration?: number,
): Promise<AxiosResponse<CombineChunksResponse>> =>
  instance.put('/api/v2/media/chunks', {
    uniqueId,
    userDefinedFileName,
    extension,
    fileSize,
    duration,
  });

export const postChunks = (
  file: FormData,
  partNumber: number,
  uniqueId: string,
) =>
  instance.post(
    `/api/v2/media/chunks?partNumber=${partNumber}&uniqueId=${uniqueId}`,
    file,
    {
      headers: {
        'Content-Type': 'multipart/form-data', // Content-Type을 반드시 이렇게 하여야 한다.
      },
    },
  );

const initFileUpload = (totalPartCount: number) =>
  instance.post(`/api/v2/media/chunks/init`, {
    totalPartCount,
  });

export default initFileUpload;
