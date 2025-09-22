import React from 'react';
import styles from './ProgressSquare.module.css';

interface ProgressSquareProps {
  stepNumber: number;
  isCompleted: boolean;
  isCurrent: boolean;
}

const ProgressSquare: React.FC<ProgressSquareProps> = ({ 
  stepNumber, 
  isCompleted, 
  isCurrent 
}) => {
  let className = `${styles.progressSquare} `;
  
  if (isCompleted) {
    className += styles.completed;
  } else if (isCurrent) {
    className += styles.current;
  } else {
    className += styles.uncompleted;
  }
  
  return (
    <div className={className}>
      {isCompleted || isCurrent ? stepNumber : '?'}
    </div>
  );
};

interface ProgressSquaresProps {
  totalSteps?: number;
  completedSteps?: number;
  currentStep?: number;
}

const ProgressSquares: React.FC<ProgressSquaresProps> = ({
  totalSteps = 14,
  // completedSteps = 9,
  currentStep = 10
}) => {
  const renderSquares = () => {
    return Array.from({ length: totalSteps }, (_, index) => {
      const stepNumber = index + 1;
      const isCompleted = stepNumber < currentStep; // Пройденные шаги только до текущего
      const isCurrent = stepNumber === currentStep;
      
      return (
        <ProgressSquare
          key={index}
          stepNumber={stepNumber}
          isCompleted={isCompleted}
          isCurrent={isCurrent}
        />
      );
    });
  };

  return (
    <div className={styles.progressContainer}>
      {renderSquares()}
    </div>
  );
};

export default ProgressSquares;
export { ProgressSquare };