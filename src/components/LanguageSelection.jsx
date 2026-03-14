import React from 'react';

const LanguageSelection = ({ onSelect }) => {
  return (
    <div className="game-container">
      <h1>Choose your Language</h1>
      <div className="button-grid">
        <button className="btn btn-hindi" onClick={() => onSelect('Hindi')}>
          Hindi (हिन्दी)
        </button>
        <button className="btn btn-telugu" onClick={() => onSelect('Telugu')}>
          Telugu (తెలుగు)
        </button>
      </div>
    </div>
  );
};

export default LanguageSelection;
