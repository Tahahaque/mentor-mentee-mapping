import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';

const HomePage = () => {
  const navigate = useNavigate();
  const { updateState, resetState } = useAppContext();

  const handleRoleSelection = (role) => {
    resetState(); // Clear any previous data
    updateState({ role });
    navigate(`/${role}/1`);
  };

  return (
    <div className="home-container">
      <div className="card" style={{ background: 'rgba(255, 255, 255, 0.95)' }}>
        <h1 className="home-title" style={{ color: '#333' }}>
          Mentor-Mentee Mapping
        </h1>
        <p className="home-subtitle" style={{ color: '#666' }}>
          Connect with the perfect mentor or find your ideal mentee through our smart matching system
        </p>
        
        <div className="role-buttons">
          <button 
            className="btn btn-large"
            onClick={() => handleRoleSelection('mentee')}
          >
            I'm looking for a Mentor
          </button>
          <button 
            className="btn btn-large"
            onClick={() => handleRoleSelection('mentor')}
          >
            I want to be a Mentor
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
