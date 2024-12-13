import instance from './instance';

const enrollOnlineLesson = async (
  targetCourseId,
  title,
  lessonRange,
  lessonDescribe,
  categoryId = 0,
) =>
  instance.put('/api/online-courses/lesson', {
    targetCourseId,
    title,
    lessonRange,
    lessonDescribe,
    categoryId,
  });

export default enrollOnlineLesson;

export const getOnlineLesson = (onlineCourseId) =>
  instance.get(`/api/online-courses/lesson/${onlineCourseId}`);

export const getRootCategory = () =>
  instance.get('/api/online-courses/category/root');
export const getSubCategory = (categoryId) =>
  instance.get(`/api/online-courses/category/${categoryId}`);

export const postCategory = (categoryName, mainCategoryId) => {
  if (mainCategoryId !== undefined)
    return instance.post(`/api/online-courses/category`, {
      categoryName,
      beforeCategoryId: mainCategoryId,
    });
  return instance.post(`/api/online-courses/category`, {
    categoryName,
  });
};

export const deleteCategory = (categoryId) =>
  instance.delete(`/api/online-courses/category/${categoryId}`);
