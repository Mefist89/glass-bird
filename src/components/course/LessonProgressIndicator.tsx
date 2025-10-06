import React from 'react';

interface SubLesson {
  id: number;
  title: string;
  contentFile?: string;
}

interface LessonProgressIndicatorProps {
  subLessons: SubLesson[];
  currentSubLessonId: number | null;
  completedSubLessons: Record<number, boolean>;
  onSubLessonSelect: (subLessonId: number) => void;
}

const LessonProgressIndicator: React.FC<LessonProgressIndicatorProps> = ({
  subLessons,
  currentSubLessonId,
  completedSubLessons,
  onSubLessonSelect
}) => {
 // Если нет подуроков, возвращаем пустой индикатор
  if (!subLessons || subLessons.length === 0) {
    return <div className="flex items-center justify-center py-6"></div>;
  }

  return (
    <div className="flex items-center justify-center py-6">
      <div className="flex flex-wrap justify-center gap-3">
        {subLessons.map((subLesson) => {
          // Определяем статус подурока
          const isCurrent = subLesson.id === currentSubLessonId;
          const isCompleted = completedSubLessons[subLesson.id] || false;
          
          return (
            <button
              key={subLesson.id}
              onClick={() => onSubLessonSelect(subLesson.id)}
              className={`w-6 h-6 rounded-md border-2 transition-all ${
                isCurrent
                  ? 'bg-blue-500 border-blue-500 scale-110' // Активный подурок
                  : isCompleted
                  ? 'bg-green-500 border-green-500' // Завершенный подурок
                  : 'bg-transparent border-gray-400 hover:border-gray-300' // Незавершенный подурок
              }`}
              aria-label={`${subLesson.title} ${isCurrent ? '(текущий)' : isCompleted ? '(завершен)' : '(не завершен)'}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LessonProgressIndicator;