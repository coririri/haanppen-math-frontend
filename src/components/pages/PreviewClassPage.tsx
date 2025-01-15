import React from 'react';
import { useSearchParams } from 'react-router-dom';
import PreviewOnlineLessonList from '../organisms/PreviewOnlineLessonList';

function PreviewClassPage() {
  const [searchParams] = useSearchParams();

  return (
    <div className="flex justify-center mt-2">
      <PreviewOnlineLessonList
        teacherName={searchParams.get('teacherName') ?? ''}
        onlineCourseId={Number(searchParams.get('onlineCourseId'))}
      />
    </div>
  );
}

export default PreviewClassPage;
