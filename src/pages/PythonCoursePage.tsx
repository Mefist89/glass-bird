import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Sidebar from '../components/course/Sidebar';
import CourseContent from '../components/course/CourseContent';
import Footer from '../components/Footer';
import LoginForm from '../components/auth/LoginForm';

// Пример данных курса
const pythonCourseData = {
  title: "Курс Python для начинающих",
  modules: [
    {
      id: 1,
      title: "Модуль 1: Введение в Python",
      lessons: [
        { id: 1, title: "Что такое Python и его преимущества" },
        { id: 2, title: "Установка Python и среды разработки" },
        { id: 3, title: "Первая программа на Python" }
      ]
    },
    {
      id: 2,
      title: "Модуль 2: Основы Python",
      lessons: [
        { id: 1, title: "Переменные и типы данных" },
        { id: 2, title: "Операторы и выражения" },
        { id: 3, title: "Условные конструкции" },
        { id: 4, title: "Циклы и итерации" }
      ]
    },
    {
      id: 3,
      title: "Модуль 3: Структуры данных",
      lessons: [
        { id: 1, title: "Списки и кортежи" },
        { id: 2, title: "Словари и множества" },
        { id: 3, title: "Работа со строками" }
      ]
    }
  ]
};

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
  const [currentModule, setCurrentModule] = useState(1);
  const [currentLesson, setCurrentLesson] = useState(1);
  const [showSidebar, setShowSidebar] = useState(true);

  const handleSelectLesson = (moduleId: number, lessonId: number) => {
    setCurrentModule(moduleId);
    setCurrentLesson(lessonId);
  };

  // Получаем текущий модуль и урок
 const activeModule = pythonCourseData.modules.find(m => m.id === currentModule);
  const activeLesson = activeModule?.lessons.find(l => l.id === currentLesson);
  
  // Получаем содержимое урока или показываем заглушку
  const lessonContent = lessonContents[`${currentModule}-${currentLesson}`] || (
    <p>Содержимое этого урока находится в разработке.</p>
  );

  const [showLoginForm, setShowLoginForm] = useState(false);

  // Обработчик события открытия формы входа
  useEffect(() => {
    const handleOpenLoginForm = () => {
      setShowLoginForm(true);
    };

    window.addEventListener('openLoginForm', handleOpenLoginForm);

    return () => {
      window.removeEventListener('openLoginForm', handleOpenLoginForm);
    };
  }, []);

  const { login } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    await login({ email, password });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col md:flex-row flex-1">
        {/* Мобильное переключение между панелями */}
        <div className="md:hidden bg-white p-2 border-b border-gray-200">
          <button 
            onClick={() => setShowSidebar(!showSidebar)}
            className="w-full py-2 px-4 bg-blue-50 text-blue-700 rounded flex items-center justify-center"
          >
            {showSidebar ? 'Показать содержание урока' : 'Показать содержание курса'}
          </button>
        </div>

        {/* Боковая панель - 1/5 ширины на десктопе, условное отображение на мобильных */}
        <div className={`${showSidebar ? 'block' : 'hidden'} md:block w-full md:w-1/5 border-r border-gray-200 overflow-y-auto`}>
          <Sidebar
            title={pythonCourseData.title}
            modules={pythonCourseData.modules}
            currentModuleId={currentModule}
            currentLessonId={currentLesson}
            onSelectLesson={(moduleId, lessonId) => {
              handleSelectLesson(moduleId, lessonId);
              // На мобильных устройствах переключаемся на контент после выбора урока
              if (window.innerWidth < 768) {
                setShowSidebar(false);
              }
            }}
          />
        </div>
        
        {/* Основной контент - 4/5 ширины на десктопе, условное отображение на мобильных */}
        <div className={`${!showSidebar ? 'block' : 'hidden'} md:block w-full md:w-4/5 overflow-y-auto`}>
          {activeModule && activeLesson ? (
            <CourseContent
              moduleTitle={activeModule.title}
              lessonTitle={activeLesson.title}
              content={lessonContent}
            />
          ) : (
            <div className="p-6">
              <p>Выберите урок из боковой панели.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
      
      {/* Login Form Modal */}
      {showLoginForm && (
        <LoginForm
          onClose={() => setShowLoginForm(false)}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
};

export default PythonCoursePage;