import React from 'react';
import { LEVELS } from '../data/letters';

const LevelSelection = ({ language, onSelectLevel, onBack }) => {
  return (
    <div className="game-container">
      <h1>{language} Levels</h1>
      <p>Select how many letters to practice!</p>
      <div className="button-grid">
        {LEVELS.map((level) => (
          <button
            key={level.name}
            className="btn btn-level"
            onClick={() => onSelectLevel(level)}
          >
            {level.name} ({level.count === 'all' ? 'All' : level.count} Letters)
          </button>
        ))}
      </div>
      <button className="btn btn-back" onClick={onBack}>
        Back
      </button>
    </div>
  );
};

export default LevelSelection;
