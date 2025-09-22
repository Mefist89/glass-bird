import React, { useState } from 'react';
import styles from './Python.module.css';
import logo from '../assets/logo.png';
import ProgressSquares from '../components/ProgressSquare';
import PythonTest from './PythonTest';

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
        { id: 'lecture7', title: 'Test Lecture' },
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
          <h2 className={styles.sidebarTitle}>Course Modules</h2>
          {modules.map(module => (
            <div key={module.id} className={styles.module}>
              <div
                className={styles.moduleHeader}
                onClick={() => toggleModule(module.id)}
              >
                <span className={styles.moduleTitle}>{module.title}</span>
                <span className={`${styles.moduleArrow} ${openModules[module.id] ? styles.moduleArrowOpen : ''}`}>
                  ▼
                </span>
              </div>
              {openModules[module.id] && (
                <ul className={styles.lecturesList}>
                  {module.lectures.map(lecture => (
                    <li key={lecture.id} className={styles.lecture}>
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
          <PythonTest />
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