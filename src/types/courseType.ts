import { TeacherPreview } from './teacherType';

export interface CourseType {
  courseName: string;
  courseId: number;
  studentSize: number;
  teacherPreview: TeacherPreview;
}
