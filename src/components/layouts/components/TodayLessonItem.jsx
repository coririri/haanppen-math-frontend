import React from 'react';
import { useNavigate } from 'react-router-dom';

function TodayLessonItem({ courseId, courseDate, courseName }) {
  console.log(courseDate);
  const naviate = useNavigate();
  return (
    <li className="bg-indigo-500 p-4 rounded-md shadow-md  transition-colors duration-200">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-lg font-semibold">{courseName}</h4>
          <p className="text-sm mt-1">{`${courseDate.split('T')[0]} 수업`}</p>
        </div>
        <button
          className="bg-white text-blue-600 px-4 py-2 rounded-md shadow hover:bg-blue-100 transition-colors duration-200 font-bold"
          type="button"
          onClick={() => {
            naviate(
              `/lesson?date=${courseDate.split('T')[0]}&courseId=${courseId}&courseName=${courseName}`,
            );
          }}
        >
          Click
        </button>
      </div>
    </li>
  );
}

export default TodayLessonItem;
