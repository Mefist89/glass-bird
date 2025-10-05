import React from 'react';
import LessonProgressIndicator from './LessonProgressIndicator';

interface CourseContentProps {
  moduleTitle: string;
  lessonTitle: string;
  content: React.ReactNode;
  totalLessons: number;
  currentLessonIndex: number;
  completedLessons: boolean[];
  onLessonSelect: (index: number) => void;
}

const CourseContent: React.FC<CourseContentProps> = ({
  moduleTitle,
  lessonTitle,
  content,
  totalLessons,
  currentLessonIndex,
  completedLessons,
  onLessonSelect
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg p-6 flex-grow overflow-y-auto border-white/20 flex flex-col h-full">
      <div className="mb-6">
        <p className="text-sm text-slate-300 mb-1">{moduleTitle}</p>
        <h1 className="text-2xl font-bold text-white">{lessonTitle}</h1>
      </div>
      
      <LessonProgressIndicator 
        totalLessons={totalLessons}
        currentLessonIndex={currentLessonIndex}
        completedLessons={completedLessons}
        onLessonSelect={onLessonSelect}
      />
      
      <div className="prose prose-invert max-w-none flex-grow overflow-y-auto">
        {content}
      </div>
    </div>
  );
};

export default CourseContent;