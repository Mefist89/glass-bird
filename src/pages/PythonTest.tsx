import React, { useState, useEffect } from 'react';
import styles from './PythonTest.module.css';

interface TestQuestion {
  id: number;
  question: string;
  code?: string;
 options: string[];
  correctAnswer: number;
  explanation: string;
}

interface TestData {
  tests: TestQuestion[];
}

const PythonTest: React.FC = () => {
  const [testData, setTestData] = useState<TestData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(3000); // 50 minutes in seconds

  useEffect(() => {
    // Load test data
    fetch('/python-test-data.json')
      .then(response => response.json())
      .then(data => setTestData(data))
      .catch(error => console.error('Error loading test data:', error));
  }, []);

  useEffect(() => {
    // Timer countdown
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showResult) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleNext = () => {
    if (showResult) {
      // Move to next question
      if (testData && currentQuestionIndex < testData.tests.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      }
    } else if (selectedAnswer !== null) {
      // Show result
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleReset = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleSkip = () => {
    if (testData && currentQuestionIndex < testData.tests.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  if (!testData) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const currentQuestion = testData.tests[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  return (
    <div className={styles['test-page']}>
      <header className={styles['test-header']}>
        <div className={styles['nav-buttons']}>
          <button
            className={`${styles['nav-btn']} ${styles['prev-btn']}`}
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            ← Previous
          </button>
          <button className={`${styles['nav-btn']} ${styles['reset-btn']}`} onClick={handleReset}>
            ↻ Reset
          </button>
        </div>
        
        <div className={styles['question-counter']}>
          {currentQuestionIndex + 1}/{testData.tests.length}
        </div>
        
        <div className={styles['timer']}>
          {formatTime(timeRemaining)}
        </div>
        
        <div className={styles['nav-buttons']}>
          <button className={`${styles['nav-btn']} ${styles['skip-btn']}`} onClick={handleSkip}>
            Skip →
          </button>
          <button
            className={`${styles['nav-btn']} ${styles['next-btn']}`}
            onClick={handleNext}
            disabled={!showResult && selectedAnswer === null}
          >
            Next →
          </button>
        </div>
      </header>

      {showResult && (
        <div className={`${styles['result-banner']} ${isCorrect ? styles['correct'] : styles['incorrect']}`}>
          <span className={styles['result-icon']}>
            {isCorrect ? '✓' : '✗'}
          </span>
          Your answer is {isCorrect ? 'correct!' : 'incorrect!'}
        </div>
      )}

      <main className={styles['test-content']}>
        <div className={styles['question-section']}>
          <h2 className={styles['question-text']}>{currentQuestion.question}</h2>
          
          {currentQuestion.code && (
            <div className={styles['code-block']}>
              <pre><code>{currentQuestion.code}</code></pre>
            </div>
          )}
          
          <div className={styles['options-grid']}>
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`${styles['option-btn']} ${
                  selectedAnswer === index ? styles['selected'] : ''
                } ${
                  showResult && index === currentQuestion.correctAnswer ? styles['correct'] : ''
                } ${
                  showResult && selectedAnswer === index && selectedAnswer !== currentQuestion.correctAnswer ? styles['incorrect'] : ''
                }`}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {showResult && (
          <div className={styles['explanation-section']}>
            <h3>Explanation:</h3>
            <div className={styles['explanation-content']}>
              {currentQuestion.explanation}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PythonTest;