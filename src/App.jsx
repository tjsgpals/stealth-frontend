import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/main/MainPage";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import GameReadyPage from "./pages/game/GameReadyPage";
import SelectTagger from "./pages/game/SelectTagger";
import "./App.module.css";
import { GameProvider } from "./context/GameContext";
import GamePage from "./pages/game/GamePage";
import GameOverPage from "./pages/game/GameOverPage";
import PausedPage from "./pages/game/PausedPage";

function App() {
  return (
    <GameProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/game/ready" element={<GameReadyPage />} />
          <Route path="/game/select-tagger" element={<SelectTagger />} />
          <Route path="/game/play" element={<GamePage />} />
          <Route path="/game/over" element={<GameOverPage />} />
          <Route path="/game/paused" element={<PausedPage />} />
        </Routes>
      </Router>
    </GameProvider>
  );
}

export default App;
