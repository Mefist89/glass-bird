import React from 'react';
import AuthForm from './AuthForm';

interface RegistrationFormProps {
  onClose: () => void;
  onRegister: (name: string, email: string, password: string) => Promise<void>;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onClose, onRegister }) => {
  const handleLogin = async (email: string, password: string) => {
    // Заглушка для входа - в реальном приложении здесь будет вызов соответствующего API
    console.log('Попытка входа:', { email, password });
    throw new Error('Функция входа недоступна из формы регистрации');
  };

  return (
    <AuthForm 
      onClose={onClose} 
      onLogin={handleLogin} 
      onRegister={onRegister}
      initialMode="register"
    />
  );
};

export default RegistrationForm;