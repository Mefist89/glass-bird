import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Sidebar from '../components/course/Sidebar';
import CourseContent from '../components/course/CourseContent';
import LoginForm from '../components/auth/LoginForm';
import courseData from '../data/pythonCourseData.json';

// Types for the course


// Function to load lesson content from markdown file
const loadLessonContent = async (moduleId: number, lessonId: number, subLessonId?: number): Promise<React.ReactNode> => {
  try {
    // Check if the lesson or sublesson has a link to a content file
    const module = courseData.modules.find(m => m.id === moduleId);
    const lesson = module?.lessons.find(l => l.id === lessonId);
    
    // If a sublesson is specified, find it
    if (subLessonId && lesson?.subLessons) {
      // Используем type assertion для доступа к contentFile
      const subLesson = lesson.subLessons.find(sl => sl.id === subLessonId);
      if (subLesson && 'contentFile' in subLesson && subLesson.contentFile) {
        // Load content from sublesson file
        const contentFile = subLesson.contentFile as string;
        if (contentFile.endsWith('.md')) {
          // Use fetch to get markdown file content
          const response = await fetch(`/${contentFile}`);
          if (response.ok) {
            const markdownContent = await response.text();
            return markdownContent;
          } else {
            throw new Error(`Failed to load markdown file: ${contentFile}`);
          }
        } else {
          const content = await import(/* @vite-ignore */ `../${contentFile.replace('src/', '')}`);
          return content.default;
        }
      }
    } else if (lesson && 'contentFile' in lesson && lesson.contentFile) {
      // Load content from lesson file
      const contentFile = lesson.contentFile as string;
      if (contentFile.endsWith('.md')) {
        // Use fetch to get markdown file content
        const response = await fetch(`/${contentFile}`);
        if (response.ok) {
          const markdownContent = await response.text();
          return markdownContent;
        } else {
          throw new Error(`Failed to load markdown file: ${contentFile}`);
        }
      } else {
        const content = await import(/* @vite-ignore */ `../${contentFile.replace('src/', '')}`);
        return content.default;
      }
    }
    
    // If the lesson has no content file, return a placeholder
    return (
      <div className="p-0">
        <p>This lesson content is under development.</p>
      </div>
    );
  } catch (error) {
    console.error('Error loading lesson content:', error);
    // In case of error, return a placeholder
    return (
      <div className="p-0">
        <p>This lesson content is temporarily unavailable.</p>
      </div>
    );
  }
};


const PythonCoursePage: React.FC = () => {
  const [currentModule, setCurrentModule] = useState<number>(1);
  const [currentLesson, setCurrentLesson] = useState<number>(1);
  const [currentSubLesson, setCurrentSubLesson] = useState<number | null>(null);
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const [showLoginForm, setShowLoginForm] = useState<boolean>(false);
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean[]>>({});
  const [completedSubLessons, setCompletedSubLessons] = useState<Record<number, boolean>>({});
  const [lessonContent, setLessonContent] = useState<React.ReactNode>(null);

  const { login } = useAuth();

 // Load progress from localStorage when component mounts
  useEffect(() => {
    const savedProgress = localStorage.getItem('pythonCourseProgress');
    if (savedProgress) {
      try {
        setCompletedLessons(JSON.parse(savedProgress));
      } catch (e) {
        console.error('Error loading progress:', e);
      }
    }
    
    // Load sub-lesson progress from localStorage
    const savedSubLessonProgress = localStorage.getItem('pythonSubLessonProgress');
    if (savedSubLessonProgress) {
      try {
        setCompletedSubLessons(JSON.parse(savedSubLessonProgress));
      } catch (e) {
        console.error('Error loading sub-lesson progress:', e);
      }
    }
  }, []);

  // Save progress to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('pythonCourseProgress', JSON.stringify(completedLessons));
  }, [completedLessons]);

  // Save sub-lesson progress to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('pythonSubLessonProgress', JSON.stringify(completedSubLessons));
  }, [completedSubLessons]);

  // Lesson selection handler
  const handleSelectLesson = useCallback(async (moduleId: number, lessonId: number) => {
    // Mark the current lesson as completed
    setCompletedLessons(prev => {
      const moduleKey = `module-${moduleId}`;
      const lessonIndex = lessonId - 1;
      
      // Create a new array of completed lessons for the module if it doesn't exist
      const updatedModuleLessons = [...(prev[moduleKey] || [])];
      
      // Mark the lesson as completed
      updatedModuleLessons[lessonIndex] = true;
      
      return {
        ...prev,
        [moduleKey]: updatedModuleLessons
      };
    });
    
    setCurrentModule(moduleId);
    setCurrentLesson(lessonId);
    setCurrentSubLesson(null); // Reset selected sublesson when switching to a new lesson
    
    // Load lesson content
    const content = await loadLessonContent(moduleId, lessonId);
    setLessonContent(content);
  }, []);

  // Sublesson selection handler
  const handleSelectSubLesson = useCallback(async (subLessonId: number) => {
    setCurrentSubLesson(subLessonId);
    
    // Load sublesson content
    const content = await loadLessonContent(currentModule, currentLesson, subLessonId);
    setLessonContent(content);
    
    // Mark the sublesson as completed
    setCompletedSubLessons(prev => ({
      ...prev,
      [subLessonId]: true
    }));
  }, [currentModule, currentLesson]);

  // Получаем текущий модуль и урок
  const activeModule = courseData.modules.find(m => m.id === currentModule);
  const activeLesson = activeModule?.lessons.find(l => l.id === currentLesson);
  const subLessons = activeLesson?.subLessons || [];

  // Handler for login form opening event
  useEffect(() => {
    const handleOpenLoginForm = () => {
      setShowLoginForm(true);
    };

    window.addEventListener('openLoginForm', handleOpenLoginForm);

    // Clean up listener when component unmounts
    return () => {
      window.removeEventListener('openLoginForm', handleOpenLoginForm);
    };
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      await login({ email, password });
      setShowLoginForm(false);
    } catch (error) {
      console.error('Login error:', error);
      // Here we can add error message display for the user
    }
  };

  // Handler for toggling sidebar on mobile devices
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
        {/* Mobile toggle between panels */}
        <div className="md:hidden bg-white/10 backdrop-blur-md p-2 border-b border-white/20">
          <button 
            onClick={toggleSidebarForMobile}
            className="w-full py-2 px-4 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded flex items-center justify-center"
            aria-label={showSidebar ? 'Hide navigation' : 'Show navigation'}
          >
            {showSidebar ? 'Hide course content' : 'Show course content'}
          </button>
        </div>

        {/* Sidebar - 1/5 width on desktop, conditional display on mobile */}
        <aside 
          className={`${showSidebar ? 'block' : 'hidden'} md:block w-full md:w-1/5 border-r border-white/20 flex flex-col`}
          aria-label="Course navigation"
        >
          <div className="backdrop-blur-lg bg-white/10 border-white/20 flex-grow flex flex-col h-full">
            <Sidebar
              title={courseData.title}
              modules={courseData.modules}
              currentModuleId={currentModule}
              currentLessonId={currentLesson}
              onSelectLesson={(moduleId, lessonId) => {
                handleSelectLesson(moduleId, lessonId);
                // On mobile devices, hide the sidebar after selecting a lesson
                if (window.innerWidth < 768) {
                  setShowSidebar(false);
                }
              }}
            />
          </div>
        </aside>
        
        {/* Main content - 4/5 width on desktop, conditional display on mobile */}
        <div 
          className={`${!showSidebar ? 'block' : 'hidden'} md:block w-full md:w-4/5 flex flex-col`}
          aria-label="Lesson content"
        >
          <div className="backdrop-blur-lg bg-white/10 border-white/20 flex-grow flex flex-col h-full">
            {activeModule && activeLesson ? (
              <CourseContent
                moduleTitle={activeModule.title}
                lessonTitle={activeLesson.title}
                content={lessonContent}
                subLessons={subLessons}
                currentSubLessonId={currentSubLesson}
                completedSubLessons={completedSubLessons}
                onSubLessonSelect={(subLessonId) => {
                  handleSelectSubLesson(subLessonId);
                }}
              />
            ) : (
              <div className="p-6">
                <p>Select a lesson from the sidebar.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Login Form Modal - only render when needed */}
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