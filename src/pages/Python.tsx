import React, { useState, useEffect } from 'react';
import styles from './Python.module.css';
import logo from '../assets/logo.png';
import ProgressSquares from '../components/ProgressSquare';
import PythonTest from './PythonTest';

const Python: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerGrid}>
          <div className={styles.logoContainer}>
            <img src={logo} alt="Logo" className={styles.logo} />
            <h1>Python Course</h1>
          </div>
          <div className={styles.progressContainer}>
            <ProgressSquares totalSteps={9} completedSteps={3} currentStep={4} />
          </div>
        </div>
      </header>
      
      {/* Main Content Area */}
      <div className={styles.main}>
        <main className={styles.content}>
          <PythonTest isMobile={isMobile} />
        </main>
      </div>
      
      {/* Footer */}
      <footer className={styles.footer}>
        <p>Footer Content</p>
      </footer>
    </div>
  );
};

export default Python;