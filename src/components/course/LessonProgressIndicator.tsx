import React from 'react';

interface LessonProgressIndicatorProps {
  totalLessons: number;
  currentLessonIndex: number;
  completedLessons: boolean[];
  onLessonSelect: (index: number) => void;
}

const LessonProgressIndicator: React.FC<LessonProgressIndicatorProps> = ({
  totalLessons,
  currentLessonIndex,
  completedLessons,
  onLessonSelect
}) => {
  return (
    <div className="flex items-center justify-center py-6">
      <div className="flex space-x-3">
        {Array.from({ length: totalLessons }).map((_, index) => (
          <button
            key={index}
            onClick={() => onLessonSelect(index + 1)}
            className={`w-6 h-6 rounded-md border-2 transition-all ${
              index === currentLessonIndex
                ? 'bg-blue-500 border-blue-500 scale-110' // Активный урок
                : completedLessons[index]
                ? 'bg-green-500 border-green-500' // Завершенный урок
                : 'bg-transparent border-gray-400 hover:border-gray-300' // Незавершенный урок
            }`}
            aria-label={`Урок ${index + 1} ${index === currentLessonIndex ? '(текущий)' : completedLessons[index] ? '(завершен)' : '(не завершен)'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default LessonProgressIndicator;