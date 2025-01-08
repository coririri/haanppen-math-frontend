import { TeacherPreview } from './teacherType';

export interface CourseType {
  type?: 'offline' | 'online';
  courseName: string;
  courseId: number;
  studentSize: number;
  teacherPreview: TeacherPreview;
}
