export interface StudentPreviewType {
  studentId: number;
  studentName: string;
  grade: number;
}

export interface CourseStudentType {
  id: number;
  name: string;
  phoneNumber?: string;
  grade: number;
  registeredDateTime?: string;
}

export interface StudentType {
  id: number;
  name: string;
  phoneNumber: string;
  grade: number;
  registeredDateTime?: string;
}

export interface StudentByGradeType {
  grade: number;
  students: CourseStudentType[];
}
