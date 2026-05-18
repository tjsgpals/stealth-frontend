import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../../context/useGameContext';
import styles from './PausedPage.module.css';

export default function PausedPage() {
  const navigate = useNavigate();
  const { score, time } = useGameContext();

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResume = () => {
    navigate('/game/play');
  };

  const handleRestart = () => {
    navigate('/game/play');
  };

  const handleEnd = () => {
    navigate('/game/ready');
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.square1}></div>
        <div className={styles.square3}></div>
      </div>

      <div className={styles.contentBox}>
        <h1 className={styles.title}>PAUSED</h1>
        
        <div className={styles.statsContainer}>
          <div className={styles.stat}>SCORE: {score}</div>
          <div className={styles.stat}>TIME LEFT: {formatTime(time)}</div>
        </div>

        <div className={styles.buttonGroup}>
          <div className={styles.resumeContainer}>
            <button className={styles.resumeBtn} onClick={handleResume}>
              RESUME
            </button>
          </div>

          <div className={styles.restartEndContainer}>
            <button className={styles.restartBtn} onClick={handleRestart}>
              RE<br />START
            </button>
            <button className={styles.endBtn} onClick={handleEnd}>
              END
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}