import React, { useState } from 'react';
import { X, Mail, Lock, LogIn } from 'lucide-react';

interface LoginFormProps {
  onClose: () => void;
  onLogin: (email: string, password: string) => Promise<void>;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await onLogin(email, password);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка входа');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md">
        {/* Декоративные элементы */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>

        {/* Форма */}
        <div className="relative glass-effect rounded-2xl p-8 shadow-2xl">
          {/* Кнопка закрытия */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>

          {/* Заголовок */}
          <div className="text-center mb-8">
            <div className="text-4xl mb-3">🐦</div>
            <h2 className="text-3xl font-bold text-gradient mb-2">
              Добро пожаловать
            </h2>
            <p className="text-slate-400">Войдите в Glass Bird</p>
          </div>

          {/* Ошибка */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}

          {/* Форма */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-300">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-glass pl-11"
                  placeholder="admin@glassbird.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-300">
                Пароль
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-glass pl-11"
                  placeholder="••••••"
                  required
                />
              </div>
            </div>

            {/* Кнопка входа */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Вход...</span>
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  <span>Войти</span>
                </>
              )}
            </button>
          </form>

          {/* Подсказка для тестирования */}
          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-xs text-slate-300 text-center">
              <strong>Тестовый вход:</strong><br />
              Email: <code className="text-blue-400">admin@glassbird.com</code><br />
              Пароль: <code className="text-blue-400">admin123</code>
            </p>
          </div>

          {/* Разделитель */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-400">
              Нет аккаунта?{' '}
              <button className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                Зарегистрироваться
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;