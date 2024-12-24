import { create } from 'zustand';

// eslint-disable-next-line import/prefer-default-export
export const useCourseStudentStore = create((set) => ({
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

  setEntireStudents: (students) =>
    set(() => {
      const newStudents = [
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
        });
        tempStudentsNum += 1;
      });
      return {
        entireStudentsNum: tempStudentsNum,
        entireStudents: newStudents,
      };
    }),
}));
