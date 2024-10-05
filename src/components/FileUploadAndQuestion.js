// src/components/FileUploadAndQuestion.js
import React, { useState } from 'react';
import axios from 'axios';

const FileUploadAndQuestion = ({ onResponse }) => {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState('');
  const [fileUploaded, setFileUploaded] = useState(false); // Track if file is uploaded
  const [isUploading, setIsUploading] = useState(false); // Track file upload status
  const [isGenerating, setIsGenerating] = useState(false); // Track answer generation status

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async (event) => {
    event.preventDefault();
    setIsUploading(true); // Start loading state

    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }

    try {
      await axios.post('https://ask-your-pdf-backend.onrender.com/upload_file', formData); // Upload file
      setFileUploaded(true); // Mark file as uploaded
      alert("File uploaded successfully."); // Notify user of success
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsUploading(false); // End loading state
    }
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleQuestionSubmit = async (event) => {
    event.preventDefault();
    setIsGenerating(true); // Start loading state

    const formData = new FormData(); // Create a new FormData instance
    formData.append('question', question); // Append the question to the form data

    try {
      const response = await axios.post('https://ask-your-pdf-backend.onrender.com/answer_question', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
        },
      });
      onResponse(response.data.answer); // Send the new answer to the parent component (App.js)
    } catch (error) {
      console.error('Error asking question:', error);
    } finally {
      setIsGenerating(false); // End loading state
    }
  };

  return (
    <div className="upload-question-form">
      <form onSubmit={handleFileUpload}>
        <input type="file" onChange={handleFileChange} required />
        <button type="submit" disabled={isUploading}> 
          {isUploading ? "Uploading..." : "Upload File"}
        </button>
      </form>

      <div style={{ marginTop: '20px' }}>
        <textarea
          value={question}
          onChange={handleQuestionChange}
          placeholder="Ask your question..."
          disabled={!fileUploaded} // Disable until a file is uploaded
          required
          rows={4} // Adjust rows for height
          style={{ width: '100%', resize: 'true' }} // Full width and no resize
        />
        <button onClick={handleQuestionSubmit} disabled={!fileUploaded || isGenerating}>
          {isGenerating ? "Generating Answer..." : "Ask Question"}
        </button>
      </div>
    </div>
  );
};

export default FileUploadAndQuestion;
