import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';

const ResultPage = () => {
  const navigate = useNavigate();
  const { state, resetState } = useAppContext();

  const handleStartOver = () => {
    resetState();
    navigate('/');
  };

  if (!state.result) {
    return (
      <div className="container">
        <div className="card">
          <div className="result-container">
            <h2>No results found</h2>
            <button className="btn" onClick={handleStartOver}>
              Start Over
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <div className="result-container">
          {state.role === 'mentee' ? (
            <>
              <h2 className="question-title">
                Great! We found your perfect mentor match! 🎉
              </h2>
              
              {state.result.bestMatch ? (
                <div className="match-card">
                  <div className="match-name">
                    🎯 {state.result.bestMatch.name}
                  </div>
                  <div className="match-score">
                    Compatibility Score: {state.result.bestMatch.matchScore}/20
                    <br />
                    <small>(Lower scores indicate better compatibility)</small>
                    <br />
                    <small>Perfect Match = 0 | Opposite Match = 20</small>
                  </div>
                  <div style={{ marginTop: '15px', fontSize: '14px', opacity: '0.9' }}>
                    <strong>Score Breakdown:</strong><br />
                    Your scores: [{state.scores.join(', ')}]<br />
                    Mentor scores: [{state.result.bestMatch.scores.join(', ')}]<br />
                    <small>Categories: Skill Focus | Working Style | Communication | Structure | Career Transition</small>
                  </div>
                </div>
              ) : (
                <div style={{ 
                  padding: '2rem', 
                  background: '#f8f9fa', 
                  borderRadius: '8px',
                  margin: '2rem 0'
                }}>
                  <h3 style={{ color: '#666' }}>No mentors available yet</h3>
                  <p style={{ color: '#888' }}>
                    Don't worry! We've saved your profile and will notify you 
                    when a compatible mentor joins our platform.
                  </p>
                </div>
              )}
              
              <div style={{ marginTop: '2rem', color: '#666' }}>
                <h4>Your Profile Summary:</h4>
                <p><strong>Name:</strong> {state.name}</p>
                <p><strong>Scores:</strong> [{state.scores.join(', ')}]</p>
                <p><strong>Registered:</strong> {new Date().toLocaleDateString()}</p>
              </div>
            </>
          ) : (
            <>
              <h2 className="question-title">
                Thank you for joining as a mentor! 🌟
              </h2>
              
              <div style={{ 
                padding: '2rem', 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                borderRadius: '12px',
                margin: '2rem 0'
              }}>
                <h3>Welcome to our mentor community!</h3>
                <p>
                  Your profile has been successfully saved. We'll match you with 
                  compatible mentees and notify you about potential connections.
                </p>
              </div>
              
              <div style={{ marginTop: '2rem', color: '#666' }}>
                <h4>Your Mentor Profile:</h4>
                <p><strong>Name:</strong> {state.name}</p>
                <p><strong>Scores:</strong> [{state.scores.join(', ')}]</p>
                <p><strong>Registered:</strong> {new Date().toLocaleDateString()}</p>
              </div>
            </>
          )}
          
          <div style={{ marginTop: '3rem' }}>
            <button className="btn btn-large" onClick={handleStartOver}>
              Start Over
            </button>
            <div style={{ marginTop: '20px', color: '#666', textAlign: 'center' }}>
              <small>
                Admin Panel: <a href="http://localhost:3001/admin" target="_blank" rel="noopener noreferrer" style={{ color: '#667eea' }}>
                  View All Matches & Data
                </a>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
