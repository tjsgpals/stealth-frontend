import { useState } from 'react';
import GameContext from './GameContext';

export function GameProvider({ children }) {
  const [tagger_id, setTaggerId] = useState(null);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(180);

  const value = {
    tagger_id,
    setTaggerId,
    score,
    setScore,
    time,
    setTime,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}