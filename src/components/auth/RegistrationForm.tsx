import React from 'react';
import AuthForm from './AuthForm';

interface RegistrationFormProps {
  onClose: () => void;
  onRegister: (name: string, email: string, password: string) => Promise<void>;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onClose, onRegister }) => {
 return (
    <AuthForm
      onClose={onClose}
      onRegister={onRegister}
      initialMode="register"
    />
  );
};

export default RegistrationForm;