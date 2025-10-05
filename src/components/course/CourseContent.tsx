import React from 'react';
import LessonProgressIndicator from './LessonProgressIndicator';

interface SubLesson {
  id: number;
  title: string;
}

interface CourseContentProps {
  moduleTitle: string;
  lessonTitle: string;
  content: React.ReactNode;
  subLessons: SubLesson[];
  currentSubLessonId: number | null;
  completedSubLessons: Record<number, boolean>;
  onSubLessonSelect: (subLessonId: number) => void;
}

const CourseContent: React.FC<CourseContentProps> = ({
  moduleTitle,
  lessonTitle,
  content,
  subLessons,
  currentSubLessonId,
  completedSubLessons,
  onSubLessonSelect
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg p-6 flex-grow overflow-y-auto border-white/20 flex flex-col h-full">
      <div className="mb-6">
        <p className="text-sm text-slate-300 mb-1">{moduleTitle}</p>
        <h1 className="text-2xl font-bold text-white">{lessonTitle}</h1>
      </div>
      
      <LessonProgressIndicator 
        subLessons={subLessons}
        currentSubLessonId={currentSubLessonId}
        completedSubLessons={completedSubLessons}
        onSubLessonSelect={onSubLessonSelect}
      />
      
      <div className="prose prose-invert max-w-none flex-grow overflow-y-auto">
        {content}
      </div>
    </div>
  );
};

export default CourseContent;