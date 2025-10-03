import React from 'react';

interface SidebarProps {
  title: string;
  modules: {
    id: number;
    title: string;
    lessons: {
      id: number;
      title: string;
    }[];
  }[];
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
    <div className="bg-gray-100 p-4 h-full overflow-y-auto">
      <h2 className="text-xl font-bold mb-6 text-gray-800">{title}</h2>
      
      <div className="space-y-4">
        {modules.map((module) => (
          <div key={module.id} className="border-b border-gray-200 pb-3">
            <h3 className="font-medium text-gray-700 mb-2">
              {module.title}
            </h3>
            <ul className="space-y-1 pl-2">
              {module.lessons.map((lesson) => (
                <li 
                  key={lesson.id}
                  className={`py-1 px-2 rounded cursor-pointer transition-colors ${
                    currentModuleId === module.id && currentLessonId === lesson.id
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'hover:bg-gray-200 text-gray-600'
                  }`}
                  onClick={() => onSelectLesson(module.id, lesson.id)}
                >
                  {lesson.title}
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