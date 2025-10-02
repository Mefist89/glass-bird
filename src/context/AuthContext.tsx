import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { UserRole } from '../types';
import type { User, LoginData, RegisterData } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Проверка сохраненного пользователя при загрузке
  useEffect(() => {
    const savedUser = sessionStorage.getItem('glassbird_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        // Преобразуем даты из строк обратно в Date объекты
        parsedUser.createdAt = new Date(parsedUser.createdAt);
        setUser(parsedUser);
      } catch (error) {
        console.error('Ошибка при загрузке пользователя:', error);
        sessionStorage.removeItem('glassbird_user');
      }
    }
    setIsLoading(false);
  }, []);

  // Функция входа
  const login = async (data: LoginData): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Симуляция запроса к API
      await new Promise(resolve => setTimeout(resolve, 500));

      // Проверка учетных данных
      // В реальном проекте здесь будет запрос к API
      const isAdminLogin = data.email === 'admin@glassbird.com' && data.password === 'admin123';
      
      if (!isAdminLogin && data.password.length < 6) {
        throw new Error('Неверный email или пароль');
      }

      // Создаем пользователя
      const newUser: User = {
        id: Date.now().toString(),
        email: data.email,
        name: data.email.split('@')[0],
        role: isAdminLogin ? UserRole.ADMIN : UserRole.STUDENT,
        createdAt: new Date(),
        enrolledCourses: [],
        progress: {}
      };

      setUser(newUser);
      sessionStorage.setItem('glassbird_user', JSON.stringify(newUser));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Функция регистрации
  const register = async (data: RegisterData): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Симуляция запроса к API
      await new Promise(resolve => setTimeout(resolve, 500));

      // Проверка данных
      if (data.password.length < 6) {
        throw new Error('Пароль должен содержать минимум 6 символов');
      }

      if (data.name.length < 2) {
        throw new Error('Имя должно содержать минимум 2 символа');
      }

      // Создаем нового пользователя (всегда студент)
      const newUser: User = {
        id: Date.now().toString(),
        email: data.email,
        name: data.name,
        role: UserRole.STUDENT,
        createdAt: new Date(),
        enrolledCourses: [],
        progress: {}
      };

      setUser(newUser);
      sessionStorage.setItem('glassbird_user', JSON.stringify(newUser));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Функция выхода
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('glassbird_user');
  };

  // Функция обновления данных пользователя
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      sessionStorage.setItem('glassbird_user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.role === UserRole.ADMIN,
    login,
    register,
    logout,
    updateUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Хук для использования AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  return context;
};