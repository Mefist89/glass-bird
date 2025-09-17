import React, { useState } from 'react';
import styles from './Register.module.css';
import { Eye, EyeOff, User, Mail, Lock, Facebook, Chrome } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; confirmPassword?: string }>({});

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; password?: string; confirmPassword?: string } = {};
    
    if (!name) {
      newErrors.name = 'Name is required';
    } else if (name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Form is valid, proceed with registration logic
      console.log('Registration attempt with:', { name, email, password });
      // Here you would typically send the data to your registration service
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className={styles.container}>
      <div className={styles.registerCard}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <User size={32} />
          </div>
          <h1>Create Account</h1>
          <p>Join us today and start your journey</p>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <User className={styles.inputIcon} size={20} />
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`${styles.input} ${errors.name ? styles.error : ''}`}
              />
            </div>
            {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
          </div>
          
          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <Mail className={styles.inputIcon} size={20} />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${styles.input} ${errors.email ? styles.error : ''}`}
              />
            </div>
            {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
          </div>
          
          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} size={20} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${styles.input} ${errors.password ? styles.error : ''}`}
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <span className={styles.errorMessage}>{errors.password}</span>}
          </div>
          
          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} size={20} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`${styles.input} ${errors.confirmPassword ? styles.error : ''}`}
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && <span className={styles.errorMessage}>{errors.confirmPassword}</span>}
          </div>
          
          <button type="submit" className={styles.submitButton}>
            Sign Up
          </button>
        </form>
        
        <div className={styles.divider}>
          <span>or sign up with</span>
        </div>
        
        <div className={styles.socialLogin}>
          <button className={styles.socialButton}>
            <Chrome size={20} />
            Google
          </button>
          <button className={styles.socialButton}>
            <Facebook size={20} />
            Facebook
          </button>
        </div>
        
        <div className={styles.loginLink}>
          <p>Already have an account? <a href="/login">Sign in</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;