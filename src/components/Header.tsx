import { useState, useEffect } from 'react';
import { User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavItem {
  title: string;
  url: string;
}

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks: NavItem[] = [
    { title: 'Home', url: '/' },
    { title: 'Courses', url: '/#courses' },
    { title: 'Python Course', url: '/python-course' },
    { title: 'About Us', url: '#about' },
    { title: 'Contact', url: '#contact' },
  ];

  return (
    <header className="relative z-20 backdrop-blur-md bg-slate-900/30 border-b border-white/10">
      <nav className="w-full px-6 py-4">
        <div className="max-w-[95%] xl:max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-3xl">🐦</div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Glass Bird
            </span>
          </div>
{/* Desktop Menu */}
<div className="hidden lg:flex items-center space-x-10">
  {navLinks.map((link, index) => (
    <a
      key={index}
      href={link.url}
      className={`hover:text-blue-400 transition-colors ${location.pathname === link.url ? 'text-blue-400 font-medium' : ''}`}
      aria-label={link.title}
      onClick={(e) => {
        if (link.url.startsWith('/')) {
          e.preventDefault();
          navigate(link.url);
        }
      }}
    >
      {link.title}
    </a>
  ))}
  
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-4 py-2 glass-effect rounded-lg">
                  <User size={18} />
                  <span className="text-sm">{user?.name}</span>
                  {isAdmin && (
                    <span className="px-2 py-0.5 bg-blue-500 text-xs rounded-full" aria-label="Administrator">
                      Admin
                    </span>
                  )}
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-all hover:scale-105"
                  aria-label="Logout from account"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  // Create a custom event to open the login form
                  window.dispatchEvent(new CustomEvent('openLoginForm', { detail: {} }));
                }}
                className="flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all hover:scale-105"
                aria-label="Login to account"
              >
                <User size={18} />
                <span>Login</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-4">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className={`block hover:text-blue-400 transition-colors py-2 border-b border-white/10 ${location.pathname === link.url ? 'text-blue-400 font-medium' : ''}`}
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  if (link.url.startsWith('/')) {
                    e.preventDefault();
                    navigate(link.url);
                  }
                }}
              >
                {link.title}
              </a>
            ))}
            
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2 px-4 py-2 glass-effect rounded-lg">
                  <User size={18} />
                  <span>{user?.name}</span>
                  {isAdmin && (
                    <span className="px-2 py-0.5 bg-blue-500 text-xs rounded-full">
                      Admin
                    </span>
                  )}
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-2 bg-red-60 hover:bg-red-700 rounded-lg transition-all"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  // Create a custom event to open the login form
                  window.dispatchEvent(new CustomEvent('openLoginForm', { detail: {} }));
                }}
                className="w-full flex items-center justify-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all"
              >
                <User size={18} />
                <span>Login</span>
              </button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;