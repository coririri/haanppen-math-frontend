import { TeacherPreview } from './teacherType';

export interface CourseType {
  type?: 'offline' | 'online';
  courseName: string;
  courseId: number;
  studentSize: number;
  teacherPreview: TeacherPreview;
}

interface LessonCategoryInfo {
  categoryId: number;
  parentCategoryName: string;
  categoryName: string;
}

export interface CourseOverviewType {
  type?: 'offline' | 'online';
  courseName: string;
  courseId: number;
  studentSize: number;
  teacherPreview: TeacherPreview;
  lessonCategoryInfo: LessonCategoryInfo;
  imageSrc: null | string;
}
