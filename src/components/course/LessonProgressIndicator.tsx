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
    <div className="flex flex-col items-center py-6 w-full">
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {subLessons.map((subLesson, index) => {
          // Определяем статус подурока
          const isCurrent = subLesson.id === currentSubLessonId;
          const isCompleted = completedSubLessons[subLesson.id] || false;
          // Подурок доступен, если это первый подурок или предыдущий подурок завершен
          const isAvailable = index === 0 || completedSubLessons[subLessons[index - 1].id];
          
          return (
            <button
              key={subLesson.id}
              onClick={() => isAvailable && onSubLessonSelect(subLesson.id)}
              className={`px-4 py-2 rounded-lg border-2 transition-all min-w-[150px] ${
                isCurrent
                  ? 'bg-blue-500 border-blue-500 text-white' // Активный подурок
                  : isCompleted
                  ? 'bg-green-500 border-green-500 text-white' // Завершенный подурок
                  : isAvailable
                  ? 'bg-white/10 border-gray-400 text-gray-20 hover:border-gray-30 hover:bg-white/20' // Доступный подурок
                  : 'bg-gray-700 border-gray-600 text-gray-400 cursor-not-allowed opacity-50' // Недоступный подурок
              }`}
              disabled={!isAvailable}
              aria-label={`${subLesson.title} ${isCurrent ? '(текущий)' : isCompleted ? '(завершен)' : isAvailable ? '(доступен)' : '(недоступен)'}`}
            >
              {subLesson.title}
              {!isAvailable && <span className="ml-1 text-xs">(заблокировано)</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LessonProgressIndicator;