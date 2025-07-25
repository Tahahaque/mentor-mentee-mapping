import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../App';
import { QUESTIONS } from './questionsData';

const QuestionPage = () => {
  const navigate = useNavigate();
  const { questionNum } = useParams();
  const { state, updateState } = useAppContext();
  const [name, setName] = useState('');
  
  const currentQuestionIndex = parseInt(questionNum) - 1;
  const currentQuestion = QUESTIONS[state.role]?.[currentQuestionIndex];
  
  useEffect(() => {
    // Redirect if no role is selected
    if (!state.role) {
      navigate('/');
      return;
    }
    
    // Redirect if question number is invalid
    if (!currentQuestion) {
      navigate('/');
      return;
    }
  }, [state.role, currentQuestion, navigate]);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      updateState({ name: name.trim() });
    }
  };

  const handleOptionSelect = (score) => {
    const newScores = [...state.scores];
    newScores[currentQuestionIndex] = score;
    updateState({ scores: newScores });
    
    // Navigate to next question or result page
    if (parseInt(questionNum) < 5) {
      navigate(`/${state.role}/${parseInt(questionNum) + 1}`);
    } else {
      // All questions completed, submit data
      submitData(newScores);
    }
  };

  const submitData = async (finalScores) => {
    try {
      const userData = {
        id: `${state.role}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: state.name,
        scores: finalScores,
        timestamp: new Date().toISOString()
      };

      const response = await fetch(`/${state.role}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      const result = await response.json();
      
      if (response.ok) {
        updateState({ result });
        navigate('/result');
      } else {
        console.error('Error:', result.error);
        alert('Error submitting data. Please try again.');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error. Please check your connection and try again.');
    }
  };

  if (!state.role || !currentQuestion) {
    return <div>Loading...</div>;
  }

  // Show name input for first question if name is not set
  if (parseInt(questionNum) === 1 && !state.name) {
    return (
      <div className="container">
        <div className="card">
          <div className="question-container">
            <h2 className="question-title">
              Welcome! What's your name?
            </h2>
            <form onSubmit={handleNameSubmit}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                style={{
                  width: '100%',
                  padding: '16px',
                  fontSize: '16px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  marginBottom: '1rem'
                }}
                required
              />
              <button type="submit" className="btn btn-large">
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const progress = (parseInt(questionNum) / 5) * 100;

  return (
    <div className="container">
      <div className="card">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="question-container">
          <h2 className="question-title">
            Question {questionNum} of 5
          </h2>
          <h3 style={{ color: '#555', marginBottom: '2rem' }}>
            {currentQuestion.question}
          </h3>
          
          <div className="options-container">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className="option-btn"
                onClick={() => handleOptionSelect(option.score)}
              >
                {option.text}
              </button>
            ))}
          </div>
          
          <div style={{ marginTop: '2rem', color: '#888' }}>
            <small>Hello {state.name}! Choose the option that best describes you.</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
