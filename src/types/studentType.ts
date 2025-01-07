export interface StudentType {
  id: number;
  name: string;
  phoneNumber: string;
  grade: number;
  registeredDateTime: string;
}

export interface StudentByGradeType {
  grade: number;
  students: StudentType[];
}
