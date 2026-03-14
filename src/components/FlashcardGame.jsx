import React, { useState, useEffect } from 'react';

const FlashcardGame = ({ letters, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState('presentation'); // 'presentation' or 'quiz'
  const [timer, setTimer] = useState(5);
  const [score, setScore] = useState(0);
  const [quizOptions, setQuizOptions] = useState([]);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const currentLetter = letters[currentIndex];

  // Speech Helper
  const speak = (text, lang) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'Hindi' ? 'hi-IN' : 'te-IN';
    window.speechSynthesis.speak(utterance);
  };

  // Presentation Logic
  useEffect(() => {
    let interval;
    if (phase === 'presentation') {
      speak(currentLetter.char, currentLetter.lang);
      setTimer(5);
      interval = setInterval(() => {
        setTimer((t) => {
          if (t <= 1) {
            if (currentIndex < letters.length - 1) {
              setCurrentIndex(currentIndex + 1);
              return 5;
            } else {
              clearInterval(interval);
              startQuiz();
              return 0;
            }
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentIndex, phase]);

  const startQuiz = () => {
    setPhase('quiz');
    setCurrentIndex(0);
    prepareQuiz(0);
  };

  const prepareQuiz = (index) => {
    const correct = letters[index];
    let options = [correct];
    const others = letters.filter((l) => l.id !== correct.id);
    
    // Shuffle and pick 3 others
    const shuffledOthers = [...others].sort(() => 0.5 - Math.random());
    options = [...options, ...shuffledOthers.slice(0, 3)];
    
    setQuizOptions(options.sort(() => 0.5 - Math.random()));
    setQuizAnswered(false);
    setSelectedOption(null);
  };

  const handleQuizSelect = (option) => {
    if (quizAnswered) return;

    setQuizAnswered(true);
    setSelectedOption(option.id);

    if (option.id === currentLetter.id) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentIndex < letters.length - 1) {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        prepareQuiz(nextIndex);
      } else {
        onFinish(score + (option.id === currentLetter.id ? 1 : 0));
      }
    }, 1500);
  };

  if (phase === 'presentation') {
    return (
      <div className="game-container">
        <h1>Watch Carefully!</h1>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentIndex + 1) / letters.length) * 100}%` }}
          ></div>
        </div>
        <div className="flashcard-container">
          <div className="card-face">
            {currentLetter.char}
          </div>
        </div>
        <div className="timer-dots">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={`dot ${i <= timer ? 'active' : ''}`}></div>
          ))}
        </div>
        <p>Listen and identify: {currentIndex + 1} / {letters.length}</p>
      </div>
    );
  }

  return (
    <div className="game-container">
      <h1>Which one is this?</h1>
      <p>Letter {currentIndex + 1} of {letters.length}</p>
      <div className="flashcard-container" style={{ height: 'auto', marginBottom: '20px' }}>
        <div className="card-face" style={{ position: 'relative', height: '200px' }}>
          {currentLetter.char}
        </div>
      </div>
      <div className="quiz-grid">
        {quizOptions.map((option) => (
          <button
            key={option.id}
            className={`quiz-option ${
              quizAnswered 
                ? option.id === currentLetter.id 
                  ? 'correct' 
                  : selectedOption === option.id 
                    ? 'incorrect' 
                    : ''
                : ''
            }`}
            onClick={() => handleQuizSelect(option)}
          >
            {option.phonetic}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FlashcardGame;
