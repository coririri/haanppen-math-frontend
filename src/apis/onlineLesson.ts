import instance from './instance';

const enrollOnlineLesson = async (
  targetCourseId: number,
  title: string,
  lessonRange: string,
  lessonDescribe: string,
  imageSrc: null | string,
  categoryId = 0,
) =>
  instance.put('/api/online-courses/lesson', {
    targetCourseId,
    title,
    lessonRange,
    lessonDescribe,
    categoryId,
    imageSrc,
  });

export default enrollOnlineLesson;

export const getOnlineLesson = (onlineCourseId: number) =>
  instance.get(`/api/online-courses/lesson/${onlineCourseId}`);

export const getRootCategory = () =>
  instance.get('/api/online-courses/category/root');
export const getSubCategory = (categoryId: number) =>
  instance.get(`/api/online-courses/category/${categoryId}`);

export const postCategory = (categoryName: string, mainCategoryId?: number) => {
  if (mainCategoryId !== undefined)
    return instance.post(`/api/online-courses/category`, {
      categoryName,
      beforeCategoryId: mainCategoryId,
    });
  return instance.post(`/api/online-courses/category`, {
    categoryName,
  });
};

export const deleteCategory = (categoryId: number) =>
  instance.delete(`/api/online-courses/category/${categoryId}`);

export const postOnlineCourseVedio = (
  onlineCourseId: number,
  videoSrc: string,
) =>
  instance.post('/api/online-courses/lesson/videos', {
    onlineCourseId,
    onlineVideoRequest: {
      videoSrc,
      isPreview: false,
    },
  });

export const postOnlineCourseAttachment = (
  onlineCourseId: number,
  onlineVideoId: number,
  title: string,
  url: string,
) =>
  instance.post(
    `/api/online-courses/lesson/${onlineCourseId}/videos/${onlineVideoId}/attachments`,
    {
      attachmentTitle: title,
      attachmentContent: url,
    },
  );

export const deleteOnlineCourseAttachment = (
  onlineCourseId: number,
  onlineVideoId: number,
  attchmentId: number,
) =>
  instance.delete(
    `/api/online-courses/lesson/${onlineCourseId}/videos/${onlineVideoId}/attachments/${attchmentId}`,
  );

export const putOnlineCoursePreview = (
  onlineVideoId: number,
  previewStatus: boolean,
) =>
  instance.put('/api/online-courses/lesson/videos', {
    onlineVideoId,
    previewStatus,
  });

export const deleteOnlineCourseVedio = (
  onlineCourseId: number,
  onlineVedioId: number,
) =>
  instance.delete(
    `/api/online-courses/lesson/${onlineCourseId}/videos/${onlineVedioId}`,
  );

export const putOnlineVedioSequence = (
  onlineCourseId: number,
  targetVideoId: number,
  updatedSequence: number,
) =>
  instance.put('/api/online-courses/lesson/videos/sequence', {
    onlineCourseId,
    targetVideoId,
    updatedSequence,
  });

export const deleteOnlineLesson = (onlineCourseId: number) =>
  instance.delete(`/api/online-courses/lesson/${onlineCourseId}`);

export const getOnlineCourseByCategoryId = (categoryId: number) =>
  instance.get(`/api/online-courses/categories/${categoryId}`);

export const getMonthlyCourse = (date: string) =>
  instance.get(`/api/courses/memos/month?monthInfo=${date}`);
