import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../../context/useGameContext';
import styles from './GameOverPage.module.css';

export default function GameOverPage() {
  const navigate = useNavigate();
  const { score, time } = useGameContext();

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRestart = () => {
    navigate('/game/play');
  };

  const handleMain = () => {
    navigate('/game/ready');
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.square1}></div>
        <div className={styles.square3}></div>
      </div>

      <div className={styles.contentBox}>
        <h1 className={styles.title}>GAME OVER</h1>
        
        <div className={styles.statsContainer}>
          <div className={styles.stat}>SCORE: {score}</div>
          <div className={styles.stat}>TIME: {formatTime(time)}</div>
          <div className={styles.stat}>TAGS: 0</div>
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.restartBtn} onClick={handleRestart}>
            RE<br />START
          </button>
          <button className={styles.mainBtn} onClick={handleMain}>
            MAIN
          </button>
        </div>
      </div>
    </div>
  );
}