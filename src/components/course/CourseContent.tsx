import React from 'react';

interface CourseContentProps {
  moduleTitle: string;
  lessonTitle: string;
  content: React.ReactNode;
}

const CourseContent: React.FC<CourseContentProps> = ({
  moduleTitle,
  lessonTitle,
  content
}) => {
  return (
    <div className="bg-white p-6 h-full overflow-y-auto">
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-1">{moduleTitle}</p>
        <h1 className="text-2xl font-bold text-gray-900">{lessonTitle}</h1>
      </div>
      
      <div className="prose max-w-none">
        {content}
      </div>
    </div>
  );
};

export default CourseContent;