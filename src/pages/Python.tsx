import React, { useState } from 'react';
import styles from './Python.module.css';
import logo from '../assets/logo.png';
import ProgressSquares from '../components/ProgressSquare';

interface Lecture {
  id: string;
  title: string;
}

interface Module {
  id: string;
  title: string;
  lectures: Lecture[];
}

const Python: React.FC = () => {
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({});
  
  const modules: Module[] = [
    {
      id: 'module1',
      title: 'Module 1: Introduction to Python',
      lectures: [
        { id: 'lecture1', title: 'Lecture 1: Syntax Basics' },
        { id: 'lecture2', title: 'Lecture 2: Variables and Data Types' },
      ]
    },
    {
      id: 'module2',
      title: 'Module 2: Control Structures',
      lectures: [
        { id: 'lecture3', title: 'Lecture 3: Conditional Statements' },
        { id: 'lecture4', title: 'Lecture 4: Loops' },
      ]
    },
    {
      id: 'module3',
      title: 'Module 3: Functions',
      lectures: [
        { id: 'lecture5', title: 'Lecture 5: Defining Functions' },
        { id: 'lecture6', title: 'Lecture 6: Function Parameters' },
      ]
    }
  ];
  
  const toggleModule = (moduleId: string) => {
    setOpenModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };
  
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
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <h2>Course Modules</h2>
          {modules.map(module => (
            <div key={module.id}>
              <div
                onClick={() => toggleModule(module.id)}
                style={{
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  padding: '5px 0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                {module.title}
                <span>{openModules[module.id] ? '▼' : '►'}</span>
              </div>
              {openModules[module.id] && (
                <ul style={{ paddingLeft: '20px' }}>
                  {module.lectures.map(lecture => (
                    <li key={lecture.id} style={{ padding: '3px 0' }}>
                      {lecture.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
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