import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Sidebar from '../components/course/Sidebar';
import CourseContent from '../components/course/CourseContent';
import LoginForm from '../components/auth/LoginForm';

// Типы для курса
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

interface CourseData {
  title: string;
  modules: Module[];
}

// Импорт данных курса из JSON файла
import pythonCourseData from '../data/pythonCourseData.json';

// Пример содержимого урока
const lessonContents: Record<string, React.ReactNode> = {
 "1-1": (
    <>
      <h2>Что такое Python и его преимущества</h2>
      <p>
        Python — это высокоуровневый язык программирования общего назначения, 
        который был создан Гвидо ван Россумом и выпущен в 1991 году. Python 
        отличается простым и понятным синтаксисом, что делает его отличным 
        выбором для начинающих программистов.
      </p>
      <h3>Основные преимущества Python:</h3>
      <ul>
        <li>Простой и читаемый синтаксис</li>
        <li>Большое сообщество и обширная документация</li>
        <li>Множество библиотек для различных задач</li>
        <li>Кроссплатформенность</li>
        <li>Применение в различных областях: веб-разработка, анализ данных, машинное обучение и др.</li>
      </ul>
      <p>
        Python является интерпретируемым языком, что означает, что код выполняется 
        построчно, без необходимости компиляции всей программы перед запуском.
      </p>
    </>
  ),
  "1-2": (
    <>
      <h2>Установка Python и среды разработки</h2>
      <p>
        Для начала работы с Python вам необходимо установить интерпретатор Python 
        и, при желании, интегрированную среду разработки (IDE).
      </p>
      <h3>Установка Python:</h3>
      <ol>
        <li>Перейдите на официальный сайт Python (python.org)</li>
        <li>Скачайте последнюю версию Python для вашей операционной системы</li>
        <li>Запустите установщик и следуйте инструкциям</li>
        <li>Убедитесь, что опция "Add Python to PATH" отмечена</li>
      </ol>
      <h3>Популярные IDE для Python:</h3>
      <ul>
        <li>PyCharm - полнофункциональная IDE с множеством возможностей</li>
        <li>Visual Studio Code с расширением Python</li>
        <li>Jupyter Notebook - отлично подходит для анализа данных и обучения</li>
        <li>IDLE - простая IDE, которая поставляется вместе с Python</li>
      </ul>
    </>
  ),
  // Другие уроки могут быть добавлены аналогично
};

const PythonCoursePage: React.FC = () => {
  const [currentModule, setCurrentModule] = useState<number>(1);
  const [currentLesson, setCurrentLesson] = useState<number>(1);
  const [currentSubLesson, setCurrentSubLesson] = useState<number | null>(null);
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const [showLoginForm, setShowLoginForm] = useState<boolean>(false);
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean[]>>({});

  const { login } = useAuth();

 // Загружаем прогресс из localStorage при монтировании компонента
  useEffect(() => {
    const savedProgress = localStorage.getItem('pythonCourseProgress');
    if (savedProgress) {
      try {
        setCompletedLessons(JSON.parse(savedProgress));
      } catch (e) {
        console.error('Ошибка при загрузке прогресса:', e);
      }
    }
  }, []);

  // Сохраняем прогресс в localStorage при его изменении
  useEffect(() => {
    localStorage.setItem('pythonCourseProgress', JSON.stringify(completedLessons));
  }, [completedLessons]);

  // Обработчик выбора урока
  const handleSelectLesson = useCallback((moduleId: number, lessonId: number) => {
    // Отмечаем текущий урок как завершенный
    setCompletedLessons(prev => {
      const moduleKey = `module-${moduleId}`;
      const lessonIndex = lessonId - 1;
      
      // Создаем новый массив завершенных уроков для модуля, если его нет
      const updatedModuleLessons = [...(prev[moduleKey] || [])];
      
      // Отмечаем урок как завершенный
      updatedModuleLessons[lessonIndex] = true;
      
      return {
        ...prev,
        [moduleKey]: updatedModuleLessons
      };
    });
    
    setCurrentModule(moduleId);
    setCurrentLesson(lessonId);
  }, []);

  // Получаем текущий модуль и урок
 const activeModule = pythonCourseData.modules.find(m => m.id === currentModule);
  const activeLesson = activeModule?.lessons.find(l => l.id === currentLesson);
  
  // Получаем содержимое урока или показываем заглушку
  const lessonContent = lessonContents[`${currentModule}-${currentLesson}`] || (
    <div className="p-0">
      <p>Содержимое этого урока находится в разработке.</p>
    </div>
  );

  // Обработчик события открытия формы входа
  useEffect(() => {
    const handleOpenLoginForm = () => {
      setShowLoginForm(true);
    };

    window.addEventListener('openLoginForm', handleOpenLoginForm);

    // Очистка слушателя при размонтировании компонента
    return () => {
      window.removeEventListener('openLoginForm', handleOpenLoginForm);
    };
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      await login({ email, password });
      setShowLoginForm(false);
    } catch (error) {
      console.error('Ошибка входа:', error);
      // Здесь можно добавить отображение сообщения об ошибке пользователю
    }
  };

  // Обработчик переключения боковой панели для мобильных устройств
  const toggleSidebarForMobile = useCallback(() => {
    if (window.innerWidth < 768) {
      setShowSidebar(prev => !prev);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-slate-50">
      {/* Static Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <Header />
      
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Мобильное переключение между панелями */}
        <div className="md:hidden bg-white/10 backdrop-blur-md p-2 border-b border-white/20">
          <button 
            onClick={toggleSidebarForMobile}
            className="w-full py-2 px-4 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded flex items-center justify-center"
            aria-label={showSidebar ? 'Скрыть навигацию' : 'Показать навигацию'}
          >
            {showSidebar ? 'Скрыть содержание курса' : 'Показать содержание курса'}
          </button>
        </div>

        {/* Боковая панель - 1/5 ширины на десктопе, условное отображение на мобильных */}
        <aside 
          className={`${showSidebar ? 'block' : 'hidden'} md:block w-full md:w-1/5 border-r border-white/20 flex flex-col`}
          aria-label="Навигация по курсу"
        >
          <div className="backdrop-blur-lg bg-white/10 border-white/20 flex-grow flex flex-col h-full">
            <Sidebar
              title={pythonCourseData.title}
              modules={pythonCourseData.modules}
              currentModuleId={currentModule}
              currentLessonId={currentLesson}
              onSelectLesson={(moduleId, lessonId) => {
                handleSelectLesson(moduleId, lessonId);
                // На мобильных устройствах скрываем боковую панель после выбора урока
                if (window.innerWidth < 768) {
                  setShowSidebar(false);
                }
              }}
            />
          </div>
        </aside>
        
        {/* Основной контент - 4/5 ширины на десктопе, условное отображение на мобильных */}
        <div 
          className={`${!showSidebar ? 'block' : 'hidden'} md:block w-full md:w-4/5 flex flex-col`}
          aria-label="Контент урока"
        >
          <div className="backdrop-blur-lg bg-white/10 border-white/20 flex-grow flex flex-col h-full">
            {activeModule && activeLesson ? (
              <CourseContent
                moduleTitle={activeModule.title}
                lessonTitle={activeLesson.title}
                content={lessonContent}
                subLessons={activeLesson.subLessons || []}
                currentSubLessonId={currentSubLesson}
                completedSubLessons={{}} // Пока что пустой объект, будет обновлен позже
                onSubLessonSelect={(subLessonId) => setCurrentSubLesson(subLessonId)}
              />
            ) : (
              <div className="p-6">
                <p>Выберите урок из боковой панели.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Login Form Modal - рендерим только при необходимости */}
      {showLoginForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <LoginForm
              onClose={() => setShowLoginForm(false)}
              onLogin={handleLogin}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PythonCoursePage;