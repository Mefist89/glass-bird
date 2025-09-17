import React, { useState } from 'react';
import styles from './Login.module.css';
import { Eye, EyeOff, Lock, Mail, Facebook, Chrome } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Form is valid, proceed with login logic
      console.log('Login attempt with:', { email, password, rememberMe });
      // Here you would typically send the data to your authentication service
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <Lock size={32} />
          </div>
          <h1>Welcome Back</h1>
          <p>Sign in to continue your journey</p>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.form}>
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
          
          <div className={styles.options}>
            <label className={styles.checkboxContainer}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className={styles.checkmark}></span>
              Remember me
            </label>
            <a href="#" className={styles.forgotPassword}>Forgot password?</a>
          </div>
          
          <button type="submit" className={styles.submitButton}>
            Sign In
          </button>
        </form>
        
        <div className={styles.divider}>
          <span>or continue with</span>
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
        
        <div className={styles.registerLink}>
          <p>Don't have an account? <a href="/register">Sign up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;