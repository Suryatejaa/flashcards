import React from 'react';

const Results = ({ score, total, onRestart }) => {
  const percentage = Math.round((score / total) * 100);
  
  return (
    <div className="game-container">
      <h1>Well Done!</h1>
      <div className="score-display">{score} / {total}</div>
      <p style={{ fontSize: '1.5rem', marginBottom: '30px' }}>
        You scored <strong>{percentage}%</strong>
      </p>
      
      {percentage === 100 ? (
        <p style={{ color: '#10ac84', fontWeight: 'bold' }}>⭐ Perfect Score! You are a master! ⭐</p>
      ) : (
        <p>Keep practicing to get to 100%!</p>
      )}

      <button className="btn btn-level" style={{ marginTop: '30px' }} onClick={onRestart}>
        Play Again
      </button>
    </div>
  );
};

export default Results;
