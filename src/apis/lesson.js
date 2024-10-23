import dateTimeToDate from '../utils/dateTimeToDate';
import instance from './instance';

const enrollLesson = async (
  targetCourseId,
  registerTargetDateTime,
  title,
  content,
) =>
  instance.post('/api/courses/memos', {
    targetCourseId,
    registerTargetDateTime: dateTimeToDate(registerTargetDateTime),
    title,
    content,
  });

export default enrollLesson;

export const getLessonByDateAndCourse = async (
  targetCourseId,
  registerTargetDateTime,
) =>
  instance.get(
    `/api/courses/memos?courseId=${targetCourseId}&localDate=${registerTargetDateTime}`,
  );

export const putLessonDetailContentByClassId = async (memoId, title, content) =>
  instance.put(`/api/course/memo`, {
    memoId,
    title,
    content,
  });

export const addLessonVideo = async (memoId, mediaSource) =>
  instance.post(`/api/course/memo/media`, {
    memoId,
    mediaSource,
  });

export const putLessonVideos = async (memoId, videoDatas) =>
  instance.put(`/api/course/memo/media`, {
    memoId,
    sequenceUpdateRequests: videoDatas.map((videoData) => ({
      memoMediaId: videoData.memoMediaId,
      sequence: videoData.mediaSequence,
    })),
  });

export const deleteLessonVideo = async (memoId, memoMediaId) =>
  instance.delete(`/api/course/memo/${memoId}/media/${memoMediaId}`);

export const getLessonsByClassId = (courseId, sortIndex, page) => {
  if (Number(sortIndex) === 0)
    return instance.get(
      `/api/courses/${courseId}/memos?sort=targetDate,DESC&page=${page}&size=8`,
    );
  return instance.get(
    `/api/courses/${courseId}/memos?sort=title,ASC&page=${page}&size=8`,
  );
};

export const addAttachmentVideo = async (
  memoMediaId,
  fileName,
  totalChunkCount,
  currChunkIndex,
  isLast,
  extension,
  formData,
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

export const getAttachmentFile = (sourceId) =>
  instance.get(`/api/file/download?fileSrc=${sourceId}`, {
    responseType: 'blob', // 파일 데이터를 Blob 형태로 받기
    timeout: 30000, // 30초 (30,000 밀리초)
  });

export const deleteAttachmentFile = (targetAttachmentId) =>
  instance.delete(`/api/courses/memos/media/attachment/${targetAttachmentId}`);

export const deleteLessonById = (lessonId) =>
  instance.delete(`/api/courses/memos/${lessonId}`);
