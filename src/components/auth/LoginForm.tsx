import React from 'react';
import AuthForm from './AuthForm';

interface LoginFormProps {
  onClose: () => void;
  onLogin: (email: string, password: string) => Promise<void>;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, onLogin }) => {
  const handleRegister = async (name: string, email: string, password: string) => {
    // Заглушка для регистрации - в реальном приложении здесь будет вызов соответствующего API
    console.log('Попытка регистрации:', { name, email, password });
    throw new Error('Функция регистрации недоступна из формы входа');
  };

  return (
    <AuthForm 
      onClose={onClose} 
      onLogin={onLogin} 
      onRegister={handleRegister}
      initialMode="login"
    />
  );
};

export default LoginForm;