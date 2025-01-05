import { videoDatasSequenceType } from '../types/mediaType';
import dateTimeToDate from '../utils/dateTimeToDate';
import instance from './instance';

const enrollLesson = async (
  targetCourseId: number,
  registerTargetDateTime: Date,
  title: string,
  content: string,
) =>
  instance.post('/api/courses/memos', {
    targetCourseId,
    registerTargetDateTime: dateTimeToDate(registerTargetDateTime),
    title,
    content,
  });

export default enrollLesson;

export const getLessonByDateAndCourse = async (
  targetCourseId: number,
  registerTargetDateTime: string,
) =>
  instance.get(
    `/api/courses/memos?courseId=${targetCourseId}&localDate=${registerTargetDateTime}`,
  );

export const putLessonDetailContentByClassId = async (
  memoId: number,
  title: string,
  content: string,
) =>
  instance.put(`/api/course/memo`, {
    memoId,
    title,
    content,
  });

export const addLessonVideo = async (memoId: number, mediaSource: string) =>
  instance.post(`/api/course/memo/media`, {
    memoId,
    mediaSource,
  });

export const putLessonVideos = async (
  memoId: number,
  videoDatas: videoDatasSequenceType[],
) =>
  instance.put(`/api/course/memo/media`, {
    memoId,
    sequenceUpdateRequests: videoDatas.map((videoData) => ({
      memoMediaId: videoData.memoMediaId,
      sequence: videoData.mediaSequence,
    })),
  });

export const deleteLessonVideo = async (memoId: number, memoMediaId: number) =>
  instance.delete(`/api/course/memo/${memoId}/media/${memoMediaId}`);

export const getLessonsByClassId = (
  courseId: number,
  sortIndex: number,
  page: number,
) => {
  if (Number(sortIndex) === 0)
    return instance.get(
      `/api/courses/${courseId}/memos?sort=targetDate,DESC&page=${page}&size=8`,
    );
  return instance.get(
    `/api/courses/${courseId}/memos?sort=title,ASC&page=${page}&size=8`,
  );
};

export const addAttachmentVideo = async (
  memoMediaId: number,
  fileName: string,
  totalChunkCount: number,
  currChunkIndex: number,
  isLast: boolean,
  extension: string,
  formData: FormData,
) =>
  instance.post(
    `/api/courses/memos/media/attachment?memoMediaId=${memoMediaId}&fileName=${fileName}&totalChunkCount=${totalChunkCount}&currChunkIndex=${currChunkIndex}&isLast=${isLast}&extension=${extension}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data', // Content-Type을 반드시 이렇게 하여야 한다.
      },
    },
  );

export const getAttachmentFile = (sourceId: string) =>
  instance.get(`/api/file/download?fileSrc=${sourceId}`, {
    responseType: 'blob', // 파일 데이터를 Blob 형태로 받기
    timeout: 30000, // 30초 (30,000 밀리초)
  });

export const deleteAttachmentFile = (targetAttachmentId: number) =>
  instance.delete(`/api/courses/memos/media/attachment/${targetAttachmentId}`);

export const deleteLessonById = (lessonId: number) =>
  instance.delete(`/api/courses/memos/${lessonId}`);
