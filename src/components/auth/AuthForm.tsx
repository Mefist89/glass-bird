import React, { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, LogIn } from 'lucide-react';
import { loginUser } from '../../services/authService';

// Removing the interface definition, as we now use authentication functions directly
// Instead, we'll add optional parameters for functions if they are overridden
interface AuthFormProps {
  onClose: () => void;
  initialMode?: AuthMode;
  onLogin?: (email: string, password: string) => Promise<void>;
  onRegister?: (name: string, email: string, password: string) => Promise<void>;
}

type AuthMode = 'login' | 'register';

const AuthForm: React.FC<AuthFormProps> = ({ onClose, onLogin, onRegister, initialMode = 'login' }) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
   
  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
   
  // Registration state
  const [name, setName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   
  // General state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const validatePassword = (password: string): boolean => {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /[0-9]/.test(password);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (onLogin) {
        await onLogin(loginEmail, loginPassword);
      } else {
        await loginUser(loginEmail, loginPassword);
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (registerPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (!validatePassword(registerPassword)) {
      setError('Password must contain at least 8 characters, including uppercase and lowercase letters, and digits');
      return;
    }

    setIsLoading(true);

    try {
      if (onRegister) {
        await onRegister(name, registerEmail, registerPassword);
      } else {
        // Registration via server API
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email: registerEmail, password: registerPassword }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Registration error');
        }

        const result = await response.json();
        console.log('User successfully registered:', result.user);
      }
      // Show success registration message
      setShowSuccessMessage(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md">
        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>

        {/* Form */}
        <div className="relative glass-effect rounded-2xl p-8 shadow-2xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>

          {/* Title */}
          <div className="text-center mb-8">
            <div className="text-4xl mb-3">🐦</div>
            <h2 className="text-3xl font-bold text-gradient mb-2">
              {mode === 'login' ? 'Welcome' : 'Create Account'}
            </h2>
            <p className="text-slate-400">
              {mode === 'login' ? 'Sign in to Glass Bird' : 'Register in Glass Bird'}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}
          
          {/* Registration success message */}
          {showSuccessMessage && (
            <div className="mb-6 p-6 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200 text-center">
              <h3 className="text-xl font-semibold mb-2">Registration Successful!</h3>
              <p className="mb-4">Your account has been successfully created.</p>
              <p className="mb-4">You can now log in to the site using the provided email and password.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => setShowSuccessMessage(false)}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                >
                  Continue
                </button>
                <button
                  onClick={() => setMode('login')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Sign In
                </button>
              </div>
            </div>
          )}

          {/* Form */}
          {!showSuccessMessage && mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="input-glass pl-11 w-full"
                    placeholder="admin@glassbird.com"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="input-glass pl-11 w-full"
                    placeholder="•••••"
                    required
                  />
                </div>
              </div>

              {/* Login button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sign In...</span>
                  </>
                ) : (
                  <>
                    <LogIn size={20} />
                    <span>Sign In</span>
                  </>
                )}
              </button>
              
              {/* Test hint */}
              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <p className="text-xs text-slate-300 text-center">
                  <strong>Test Login:</strong><br />
                  Email: <code className="text-blue-400">test@example.com</code><br />
                  Password: <code className="text-blue-400">TestPass123!</code>
                </p>
              </div>
            </form>
          )}

          {!showSuccessMessage && mode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">
                  Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-glass pl-11 w-full"
                    placeholder="Your name"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    className="input-glass pl-11 w-full"
                    placeholder="admin@glassbird.com"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    className="input-glass pl-11 w-full pr-11"
                    placeholder="•••••"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <p className="text-xs text-slate-50 mt-1">
                  Minimum 8 characters, with uppercase letter and digit
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">
                  Password Confirmation
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input-glass pl-11 w-full pr-11"
                    placeholder="•••••"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Registration button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Register...</span>
                  </>
                ) : (
                  <>
                    <User size={20} />
                    <span>Register</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Separator */}
          {!showSuccessMessage && (
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-400">
                {mode === 'login' ? 'No account? ' : 'Already have an account? '}
                <button
                  className="text-blue-400 hover:text-blue-30 font-semibold transition-colors"
                  onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                >
                  {mode === 'login' ? 'Register' : 'Sign In'}
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;