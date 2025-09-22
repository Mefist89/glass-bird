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
  const [questionResults, setQuestionResults] = useState<(boolean | null)[]>([]);

  useEffect(() => {
    // Load test data
    fetch('/python-test-data.json')
      .then(response => response.json())
      .then(data => {
        setTestData(data);
        // Initialize question results array with nulls
        setQuestionResults(Array(data.tests.length).fill(null));
      })
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
      // Show result and save answer
      setShowResult(true);
      
      // Save result for current question
      const isCorrect = selectedAnswer === testData!.tests[currentQuestionIndex].correctAnswer;
      setQuestionResults(prev => {
        const newResults = [...prev];
        newResults[currentQuestionIndex] = isCorrect;
        return newResults;
      });
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

  const handleRetakeTest = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    // Reset question results array with nulls
    if (testData) {
      setQuestionResults(Array(testData.tests.length).fill(null));
    }
  };

 // Check if test is completed (all questions answered)
  const isTestCompleted = testData && questionResults.every(result => result !== null);

  // Calculate statistics
  const correctAnswers = questionResults.filter(result => result === true).length;
  const incorrectAnswers = questionResults.filter(result => result === false).length;
  const totalQuestions = questionResults.length;
  const percentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
  const isPassing = percentage >= 70;

  if (!testData) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const currentQuestion = testData.tests[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  // If test is completed, show statistics
 if (isTestCompleted) {
    return (
      <div className={styles['test-page']}>
        <header className={styles['test-header']}>
          <h1>Test Results</h1>
        </header>
        
        <main className={styles['test-content']}>
          <div className={styles['question-section']}>
            <h2>Test Completed!</h2>
            <div className={styles['result-banner']} style={{
              justifyContent: 'center',
              marginBottom: '20px',
              backgroundColor: isPassing ? '#4caf50' : '#f44336',
              padding: '15px',
              borderRadius: '8px'
            }}>
              <span className={styles['result-icon']}>{isPassing ? '✓' : '✗'}</span>
              <span>{isPassing ? 'Поздравляю!' : 'Попробуйте еще раз'}</span>
            </div>
            
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
                Your Score: {percentage}%
              </p>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginTop: '30px' }}>
              <div className={styles['result-banner']} style={{ backgroundColor: '#4caf50', padding: '20px', borderRadius: '8px' }}>
                <span className={styles['result-icon']}>✓</span>
                <span>Correct Answers: {correctAnswers}</span>
              </div>
              
              <div className={styles['result-banner']} style={{ backgroundColor: '#f44336', padding: '20px', borderRadius: '8px' }}>
                <span className={styles['result-icon']}>✗</span>
                <span>Incorrect Answers: {incorrectAnswers}</span>
              </div>
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <button
                className={styles['nav-btn']}
                onClick={handleRetakeTest}
                style={{ padding: '10px 20px', fontSize: '16px' }}
              >
                Повторить тест
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

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