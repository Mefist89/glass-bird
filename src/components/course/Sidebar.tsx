import React from 'react';

interface SubLesson {
  id: number;
  title: string;
}

interface Lesson {
  id: number;
  title: string;
  subLessons?: SubLesson[];
}

interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
}

interface SidebarProps {
  title: string;
  modules: Module[];
  currentModuleId?: number;
  currentLessonId?: number;
  onSelectLesson: (moduleId: number, lessonId: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  title,
  modules,
  currentModuleId,
  currentLessonId,
  onSelectLesson
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg p-4 flex-grow overflow-y-auto border-r border-white/20 flex flex-col h-full">
      <h2 className="text-xl font-bold mb-6 text-white">{title}</h2>
      
      <div className="space-y-4 flex-grow overflow-y-auto">
        {modules.map((module) => (
          <div key={module.id} className="border-b border-white/20 pb-3">
            <h3 className="font-medium text-white mb-2">
              {module.title}
            </h3>
            <ul className="space-y-1 pl-2">
              {module.lessons.map((lesson) => (
                <li 
                  key={lesson.id}
                  className={`py-1 px-2 rounded cursor-pointer transition-all ${
                    currentModuleId === module.id && currentLessonId === lesson.id
                      ? 'bg-blue-500/30 text-blue-300 font-medium border-l-2 border-blue-400'
                      : 'hover:bg-white/10 text-slate-200'
                  }`}
                  onClick={() => onSelectLesson(module.id, lesson.id)}
                >
                  {lesson.title}
                  {lesson.subLessons && lesson.subLessons.length > 0 && (
                    <span className="ml-2 text-xs bg-white/20 px-1.5 py-0.5 rounded-full">
                      {lesson.subLessons.length}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;