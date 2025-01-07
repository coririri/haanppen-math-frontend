import { TeacherPreview } from './teacherType';

export interface LessonOverviewType {
  courseName: string; // 강좌 이름
  courseId: number; // 강좌의 고유 ID
  studentSize: number; // 수강생 수
  teacherPreview: TeacherPreview; // 강사의 정보
}
