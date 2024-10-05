// src/components/AnswerDisplay.js
import React from 'react';

const AnswerDisplay = ({ answer }) => {
  return (
    <div className="answer-display">
      <h2>Answer:</h2>
      <p>{answer}</p>
    </div>
  );
};

export default AnswerDisplay;
