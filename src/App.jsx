import React, { useState } from 'react';
import LanguageSelection from './components/LanguageSelection';
import LevelSelection from './components/LevelSelection';
import FlashcardGame from './components/FlashcardGame';
import Results from './components/Results';
import { HINDI_LETTERS, TELUGU_LETTERS } from './data/letters';

function App() {
  const [gameState, setGameState] = useState('lang_selection'); // lang_selection, level_selection, playing, results
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [gameLetters, setGameLetters] = useState([]);
  const [finalScore, setFinalScore] = useState(0);

  const startLanguageSession = (lang) => {
    setSelectedLanguage(lang);
    setGameState('level_selection');
  };

  const startLevel = (level) => {
    const baseLetters = selectedLanguage === 'Hindi' ? HINDI_LETTERS : TELUGU_LETTERS;
    
    // Shuffle and pick letters
    let selected = [...baseLetters].sort(() => 0.5 - Math.random());
    const count = level.count === 'all' ? selected.length : level.count;
    
    setGameLetters(selected.slice(0, count).map(l => ({ ...l, lang: selectedLanguage })));
    setGameState('playing');
  };

  const handleFinish = (score) => {
    setFinalScore(score);
    setGameState('results');
  };

  const restart = () => {
    setGameState('lang_selection');
    setSelectedLanguage(null);
    setGameLetters([]);
    setFinalScore(0);
  };

  return (
    <div className="App">
      {gameState === 'lang_selection' && (
        <LanguageSelection onSelect={startLanguageSession} />
      )}
      {gameState === 'level_selection' && (
        <LevelSelection 
          language={selectedLanguage} 
          onSelectLevel={startLevel} 
          onBack={() => setGameState('lang_selection')} 
        />
      )}
      {gameState === 'playing' && (
        <FlashcardGame 
          letters={gameLetters} 
          onFinish={handleFinish} 
        />
      )}
      {gameState === 'results' && (
        <Results 
          score={finalScore} 
          total={gameLetters.length} 
          onRestart={restart} 
        />
      )}
    </div>
  );
}

export default App;
