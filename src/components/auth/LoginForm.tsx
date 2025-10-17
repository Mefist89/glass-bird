import React from 'react';
import AuthForm from './AuthForm';

interface LoginFormProps {
  onClose: () => void;
  onLogin: (email: string, password: string) => Promise<void>;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, onLogin }) => {

  return (
    <AuthForm
      onClose={onClose}
      onLogin={onLogin}
      initialMode="login"
    />
  );
};

export default LoginForm;