import React from 'react';

function TodayLessonItem({ courseName, lessonTitle }) {
  return (
    <li className="bg-indigo-500 p-4 rounded-md shadow-md  transition-colors duration-200">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-lg font-semibold">{courseName}</h4>
          <p className="text-sm mt-1">{lessonTitle}</p>
        </div>
        <button
          className="bg-white text-blue-600 px-4 py-2 rounded-md shadow hover:bg-blue-100 transition-colors duration-200 font-bold"
          type="button"
        >
          Click
        </button>
      </div>
    </li>
  );
}

export default TodayLessonItem;
