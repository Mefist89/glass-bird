import React, { useState, useEffect } from 'react';
import './Tests.css';

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
    return <div className="loading">Loading...</div>;
  }

  const currentQuestion = testData.tests[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  return (
    <div className="test-page">
      <header className="test-header">
        <div className="nav-buttons">
          <button 
            className="nav-btn prev-btn" 
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            ← Previous
          </button>
          <button className="nav-btn reset-btn" onClick={handleReset}>
            ↻ Reset
          </button>
        </div>
        
        <div className="question-counter">
          {currentQuestionIndex + 1}/{testData.tests.length}
        </div>
        
        <div className="timer">
          {formatTime(timeRemaining)}
        </div>
        
        <div className="nav-buttons">
          <button className="nav-btn skip-btn" onClick={handleSkip}>
            Skip →
          </button>
          <button 
            className="nav-btn next-btn" 
            onClick={handleNext}
            disabled={!showResult && selectedAnswer === null}
          >
            Next →
          </button>
        </div>
      </header>

      {showResult && (
        <div className={`result-banner ${isCorrect ? 'correct' : 'incorrect'}`}>
          <span className="result-icon">
            {isCorrect ? '✓' : '✗'}
          </span>
          Your answer is {isCorrect ? 'correct!' : 'incorrect!'}
        </div>
      )}

      <main className="test-content">
        <div className="question-section">
          <h2 className="question-text">{currentQuestion.question}</h2>
          
          {currentQuestion.code && (
            <div className="code-block">
              <pre><code>{currentQuestion.code}</code></pre>
            </div>
          )}
          
          <div className="options-grid">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${
                  selectedAnswer === index ? 'selected' : ''
                } ${
                  showResult && index === currentQuestion.correctAnswer ? 'correct' : ''
                } ${
                  showResult && selectedAnswer === index && selectedAnswer !== currentQuestion.correctAnswer ? 'incorrect' : ''
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
          <div className="explanation-section">
            <h3>Explanation:</h3>
            <div className="explanation-content">
              {currentQuestion.explanation}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PythonTest;