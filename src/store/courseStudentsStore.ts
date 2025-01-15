import { create } from 'zustand';
import { StudentByGradeType, StudentType } from '../types/studentType';

// eslint-disable-next-line import/prefer-default-export
export const useCourseStudentStore = create<{
  entireStudentsNum: number;
  entireStudents: StudentByGradeType[];
  setEntireStudents: (students: StudentType[]) => void;
}>((set) => ({
  entireStudentsNum: 0,
  entireStudents: [
    {
      grade: 0,
      students: [],
    },
    {
      grade: 1,
      students: [],
    },
    {
      grade: 2,
      students: [],
    },
    {
      grade: 3,
      students: [],
    },
    {
      grade: 4,
      students: [],
    },
    {
      grade: 5,
      students: [],
    },
    {
      grade: 6,
      students: [],
    },
    {
      grade: 7,
      students: [],
    },
    {
      grade: 8,
      students: [],
    },
    {
      grade: 9,
      students: [],
    },
    {
      grade: 10,
      students: [],
    },
    {
      grade: 11,
      students: [],
    },
  ],

  setEntireStudents: (students: StudentType[]) =>
    set(() => {
      const newStudents: StudentByGradeType[] = [
        {
          grade: 0,
          students: [],
        },
        {
          grade: 1,
          students: [],
        },
        {
          grade: 2,
          students: [],
        },
        {
          grade: 3,
          students: [],
        },
        {
          grade: 4,
          students: [],
        },
        {
          grade: 5,
          students: [],
        },
        {
          grade: 6,
          students: [],
        },
        {
          grade: 7,
          students: [],
        },
        {
          grade: 8,
          students: [],
        },
        {
          grade: 9,
          students: [],
        },
        {
          grade: 10,
          students: [],
        },
        {
          grade: 11,
          students: [],
        },
      ];

      let tempStudentsNum = 0;
      students.forEach((student) => {
        newStudents[student.grade].students.push({
          id: student.id,
          name: student.name,
          grade: student.grade,
        });
        tempStudentsNum += 1;
      });
      return {
        entireStudentsNum: tempStudentsNum,
        entireStudents: newStudents,
      };
    }),
}));
