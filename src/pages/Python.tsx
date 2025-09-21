import React from 'react';
import styles from './Python.module.css';
import logo from '../assets/logo.png';
import ProgressSquares from '../components/ProgressSquare';

const Python: React.FC = () => {
 return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', width: '100%', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Logo" style={{ height: '50px', marginRight: '10px' }} />
            <h1>Python Course</h1>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '-16px' }}>
            <ProgressSquares totalSteps={9} completedSteps={3} currentStep={4} />
          </div>
        </div>
      </header>
      
      {/* Main Content Area */}
      <div className={styles.main}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <h2>Sidebar</h2>
          <p>Sidebar content goes here</p>
        </aside>
        
        {/* Content */}
        <main className={styles.content}>
          <h2>Main Content</h2>
          <p>Main content goes here</p>
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