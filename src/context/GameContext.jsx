import { createContext, useContext, useState } from 'react';

const GameContext = createContext(undefined);

export function GameProvider({ children }) {
  const [tagger_id, setTaggerId] = useState(null); // 술래 ID
  const [score, setScore] = useState(0); // 점수
  const [time, setTime] = useState(180); // 시간 (초)

  const value = {
    tagger_id,
    setTaggerId,
    score,
    setScore,
    time,
    setTime,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within GameProvider');
  }
  return context;
}