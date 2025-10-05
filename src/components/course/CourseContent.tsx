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
    <div className="bg-white/10 backdrop-blur-lg p-6 h-full overflow-y-auto border-white/20">
      <div className="mb-6">
        <p className="text-sm text-slate-300 mb-1">{moduleTitle}</p>
        <h1 className="text-2xl font-bold text-white">{lessonTitle}</h1>
      </div>
      
      <div className="prose prose-invert max-w-none">
        {content}
      </div>
    </div>
  );
};

export default CourseContent;