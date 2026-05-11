import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';
import GameReadyPage from './pages/game/GameReadyPage';
import './App.module.css';
import { GameProvider } from './context/GameContext';

function App() {
  return (
    <GameProvider>
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={<GameReadyPage />} 
          />
          <Route 
            path="/login" 
            element={<LoginPage />} 
          />
          <Route 
            path="/signup" 
            element={<SignUpPage />} 
          />
          <Route 
            path="/game/ready" 
            element={<GameReadyPage />} 
          />
        </Routes>
      </Router>
    </GameProvider>
  );
}

export default App;