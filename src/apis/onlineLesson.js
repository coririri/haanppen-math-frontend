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
