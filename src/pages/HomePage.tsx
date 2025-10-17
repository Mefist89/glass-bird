import { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import LoginForm from '../components/auth/LoginForm';
import Footer from '../components/Footer';

const GlassBirdHome = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const { user, isAuthenticated, isAdmin, login } = useAuth();
  const navigate = useNavigate();

  // Handler for login form opening event
  useEffect(() => {
    const handleOpenLoginForm = () => {
      setShowLoginForm(true);
    };

    window.addEventListener('openLoginForm', handleOpenLoginForm);

    return () => {
      window.removeEventListener('openLoginForm', handleOpenLoginForm);
    };
  }, []);

  const courses = [
    {
      id: 1,
      title: 'Python for Beginners',
      description: 'Master the fundamentals of Python programming from scratch',
      icon: '🐍',
      color: 'from-emerald-500 to-green-600',
      lessons: 24,
      duration: '6 weeks'
    },
    {
      id: 2,
      title: 'Computer Networks',
      description: 'Learn network principles and protocols',
      icon: '🌐',
      color: 'from-orange-500 to-amber-600',
      lessons: 18,
      duration: '4 weeks'
    },
    {
      id: 3,
      title: 'SQL Databases',
      description: 'Working with relational databases',
      icon: '💾',
      color: 'from-purple-500 to-violet-600',
      lessons: 20,
      duration: '5 weeks'
    }
  ];

  const handleLogin = async (email: string, password: string) => {
    await login({ email, password });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-slate-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <Header />

      {/* Hero Section */}
      <section className="relative z-10 w-full px-6 py-20">
        <div className="max-w-[95%] xl:max-w-7xl mx-auto text-center">
          {isAuthenticated && (
            <div className="mb-8 p-4 glass-effect rounded-xl inline-block">
              <p className="text-lg">
                👋 Hello, <span className="font-bold text-blue-400">{user?.name}</span>!
                {isAdmin && <span className="ml-2 text-yellow-400">You are an administrator</span>}
              </p>
            </div>
          )}
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-40 to-blue-500 bg-clip-text text-transparent animate-pulse">
            Soar to New Knowledge
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-slate-300 mb-12 max-w-[90%] xl:max-w-5xl mx-auto">
            Educational platform for learning Python, computer networks, and databases
          </p>
          
          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={() => setShowLoginForm(true)}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg text-lg font-semibold transition-all hover:scale-105 shadow-lg shadow-blue-500/50 min-w-[250px]"
              >
                Start Learning
              </button>
              <button className="px-8 py-4 backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-lg font-semibold transition-all hover:scale-105 min-w-[250px]">
                Learn More
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="relative z-10 w-full px-6 py-20">
        <div className="max-w-[95%] xl:max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Our Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="group backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/30 h-full flex flex-col"
              >
                <div className={`text-6xl mb-4 transition-transform group-hover:scale-110`}>
                  {course.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{course.title}</h3>
                <p className="text-slate-300 mb-6 flex-grow">{course.description}</p>
                <div className="flex justify-between items-center text-sm text-slate-400 mb-6">
                  <span className="flex items-center space-x-1">
                    <BookOpen size={16} />
                    <span>{course.lessons} lessons</span>
                  </span>
                  <span>{course.duration}</span>
                </div>
                <button
                  className={`w-full py-3 bg-gradient-to-r ${course.color} rounded-lg font-semibold transition-all hover:shadow-lg`}
                  onClick={() => {
                    if (!isAuthenticated) {
                      setShowLoginForm(true);
                    } else {
                      navigate('/python-course');
                    }
                  }}
                >
                  {isAuthenticated ? 'Go to Course' : 'Sign In to Access'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 w-full px-6 py-20">
        <div className="max-w-[95%] xl:max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8">
              <div className="text-5xl font-bold text-blue-400 mb-2">62+</div>
              <div className="text-slate-300">Active Lessons</div>
            </div>
            <div className="text-center backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8">
              <div className="text-5xl font-bold text-cyan-400 mb-2">100+</div>
              <div className="text-slate-300">Satisfied Students</div>
            </div>
            <div className="text-center backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8">
              <div className="text-5xl font-bold text-indigo-400 mb-2">3</div>
              <div className="text-slate-300">Learning Tracks</div>
            </div>
          </div>
        </div>
      </section>

      {/* Login Form Modal */}
      {showLoginForm && (
        <LoginForm 
          onClose={() => setShowLoginForm(false)}
          onLogin={handleLogin}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default GlassBirdHome;