import React, { createContext, useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import QuestionPage from './components/QuestionPage';
import ResultPage from './components/ResultPage';

// App Context for state management
const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    role: null, // 'mentor' or 'mentee'
    scores: [],
    name: '',
    currentQuestion: 1
  });

  const updateState = (updates) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const resetState = () => {
    setState({
      role: null,
      scores: [],
      name: '',
      currentQuestion: 1
    });
  };

  return (
    <AppContext.Provider value={{ state, updateState, resetState }}>
      {children}
    </AppContext.Provider>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/mentor/:questionNum" element={<QuestionPage />} />
            <Route path="/mentee/:questionNum" element={<QuestionPage />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
