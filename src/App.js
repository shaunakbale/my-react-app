// src/App.js
import React, { useState } from 'react';
import FileUploadAndQuestion from './components/FileUploadAndQuestion';
import AnswerDisplay from './components/AnswerDisplay';
import './styles/App.css';

const App = () => {
  const [answer, setAnswer] = useState(''); // State to store the answer

  return (
    <div className="app-container">
      <h1>Ask Your PDF</h1>
      <FileUploadAndQuestion onResponse={setAnswer} />  {/* Pass setAnswer as onResponse */}
      {answer && <AnswerDisplay answer={answer} />}    {/* Display answer when available */}
      <h6>@ShaunakBale</h6>
    </div>
  );
};

export default App;
