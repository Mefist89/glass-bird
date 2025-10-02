import React, { useState } from 'react';
import { BookOpen, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/auth/LoginForm';

const GlassBirdHome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const { user, isAuthenticated, isAdmin, login, logout } = useAuth();

  const courses = [
    {
      id: 1,
      title: 'Python для начинающих',
      description: 'Освойте основы программирования на Python с нуля',
      icon: '🐍',
      color: 'from-emerald-500 to-green-600',
      lessons: 24,
      duration: '6 недель'
    },
    {
      id: 2,
      title: 'Компьютерные сети',
      description: 'Изучите принципы работы сетей и протоколы',
      icon: '🌐',
      color: 'from-orange-500 to-amber-600',
      lessons: 18,
      duration: '4 недели'
    },
    {
      id: 3,
      title: 'Базы данных SQL',
      description: 'Работа с реляционными базами данных',
      icon: '💾',
      color: 'from-purple-500 to-violet-600',
      lessons: 20,
      duration: '5 недель'
    }
  ];

  const handleLogin = async (email: string, password: string) => {
    await login({ email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-slate-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 backdrop-blur-md bg-slate-900/30 border-b border-white/10">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="text-3xl">🐦</div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Glass Bird
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#courses" className="hover:text-blue-400 transition-colors">Курсы</a>
              <a href="#about" className="hover:text-blue-400 transition-colors">О нас</a>
              <a href="#contact" className="hover:text-blue-400 transition-colors">Контакты</a>
              
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 px-4 py-2 glass-effect rounded-lg">
                    <User size={18} />
                    <span className="text-sm">{user?.name}</span>
                    {isAdmin && (
                      <span className="px-2 py-0.5 bg-blue-500 text-xs rounded-full">Admin</span>
                    )}
                  </div>
                  <button 
                    onClick={logout}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-all hover:scale-105"
                  >
                    <LogOut size={18} />
                    <span>Выйти</span>
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setShowLoginForm(true)}
                  className="flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all hover:scale-105"
                >
                  <User size={18} />
                  <span>Войти</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4">
              <a href="#courses" className="block hover:text-blue-400 transition-colors">Курсы</a>
              <a href="#about" className="block hover:text-blue-400 transition-colors">О нас</a>
              <a href="#contact" className="block hover:text-blue-400 transition-colors">Контакты</a>
              
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-2 px-4 py-2 glass-effect rounded-lg">
                    <User size={18} />
                    <span>{user?.name}</span>
                    {isAdmin && (
                      <span className="px-2 py-0.5 bg-blue-500 text-xs rounded-full">Admin</span>
                    )}
                  </div>
                  <button 
                    onClick={logout}
                    className="w-full flex items-center justify-center space-x-2 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-all"
                  >
                    <LogOut size={18} />
                    <span>Выйти</span>
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setShowLoginForm(true)}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all"
                >
                  <User size={18} />
                  <span>Войти</span>
                </button>
              )}
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {isAuthenticated && (
            <div className="mb-8 p-4 glass-effect rounded-xl inline-block">
              <p className="text-lg">
                👋 Привет, <span className="font-bold text-blue-400">{user?.name}</span>!
                {isAdmin && <span className="ml-2 text-yellow-400">Вы администратор</span>}
              </p>
            </div>
          )}
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-pulse">
            Взлетай к новым знаниям
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-12">
            Образовательная платформа для изучения Python, компьютерных сетей и баз данных
          </p>
          
          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setShowLoginForm(true)}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg text-lg font-semibold transition-all hover:scale-105 shadow-lg shadow-blue-500/50"
              >
                Начать обучение
              </button>
              <button className="px-8 py-4 backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-lg font-semibold transition-all hover:scale-105">
                Узнать больше
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="relative z-10 container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">Наши курсы</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="group backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30"
            >
              <div className={`text-6xl mb-4 transition-transform group-hover:scale-110`}>
                {course.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{course.title}</h3>
              <p className="text-slate-300 mb-6">{course.description}</p>
              <div className="flex justify-between items-center text-sm text-slate-400 mb-6">
                <span className="flex items-center space-x-1">
                  <BookOpen size={16} />
                  <span>{course.lessons} уроков</span>
                </span>
                <span>{course.duration}</span>
              </div>
              <button 
                className={`w-full py-3 bg-gradient-to-r ${course.color} rounded-lg font-semibold transition-all hover:shadow-lg`}
                onClick={() => {
                  if (!isAuthenticated) {
                    setShowLoginForm(true);
                  }
                }}
              >
                {isAuthenticated ? 'Перейти к курсу' : 'Войти для доступа'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8">
            <div className="text-5xl font-bold text-blue-400 mb-2">62+</div>
            <div className="text-slate-300">Активных уроков</div>
          </div>
          <div className="text-center backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8">
            <div className="text-5xl font-bold text-cyan-400 mb-2">100+</div>
            <div className="text-slate-300">Довольных студентов</div>
          </div>
          <div className="text-center backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8">
            <div className="text-5xl font-bold text-indigo-400 mb-2">3</div>
            <div className="text-slate-300">Направления обучения</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 backdrop-blur-md bg-slate-900/50 border-t border-white/10 mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="text-2xl">🐦</div>
              <span className="text-xl font-bold">Glass Bird</span>
            </div>
            <div className="text-slate-400 text-sm">
              © 2025 Glass Bird. Все права защищены.
            </div>
          </div>
        </div>
      </footer>

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

export default GlassBirdHome;