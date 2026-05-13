import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../../context/GameContext';
import styles from './GamePage.module.css';
import personIcon from '../../assets/icons/personIcon.png';

export default function GamePage() {
  const navigate = useNavigate();
  const { tagger_id, score, time, setTime } = useGameContext();
  const [players, setPlayers] = useState([
    { id: 1, x: 300, y: 200, color: '#9b8fb8', size: 40 },
    { id: 2, x: 450, y: 280, color: '#423df3', size: 50 },
    { id: 3, x: 500, y: 290, color: '#a946ff', size: 35 },
  ]);

  // 타이머 로직
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevTime => {
        if (prevTime <= 0) {
          clearInterval(timer);
          handleGameEnd();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [setTime]);

  // 시간을 MM:SS 형식으로 변환
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 플레이어 태깅
  const handlePlayerClick = (playerId) => {
    console.log(`Player ${playerId} tagged!`);
    // 여기서 스코어 증가 등의 로직 추가
  };

  // 게임 종료
  const handleGameEnd = () => {
    navigate('/game/over');
  };

  // 프로필 아이콘 클릭
  const handleMyPage = () => {
    navigate('/mypage');
  };

  return (
    <div className={styles.container}>
      {/* 배경 장식 */}
      <div className={styles.background}>
        <div className={styles.square1}></div>
        <div className={styles.square2}></div>
        <div className={styles.square3}></div>
      </div>

      {/* 상단 정보 헤더 */}
      <div className={styles.topHeader}>
        <div className={styles.timeDisplay}>
          {formatTime(time)}
        </div>
        <div className={styles.scoreDisplay}>
          SCORE: {score}
        </div>
        <div className={styles.taggerDisplay}>
          TAGGER: <span className={styles.taggerNumber}>
            {tagger_id !== null && tagger_id !== undefined ? tagger_id : 'N'}
          </span>
        </div>
      </div>

      {/* 메인 컨테이너 */}
      <div className={styles.mainContainer}>
        {/* 게임 영역 */}
        <div className={styles.gameBox}>
          {players.map(player => (
            <div
              key={player.id}
              className={styles.player}
              style={{
                left: `${player.x}px`,
                top: `${player.y}px`,
                width: `${player.size}px`,
                height: `${player.size}px`,
                backgroundColor: player.color,
              }}
              onClick={() => handlePlayerClick(player.id)}
            />
          ))}
        </div>

        {/* END 버튼 */}
        <button
          className={styles.endBtn}
          onClick={handleGameEnd}
        >
          END
        </button>
      </div>

      {/* 프로필 아이콘 */}
      <button
        className={styles.profileIcon}
        onClick={handleMyPage}
      >
        <img src={personIcon} alt="profile" />
      </button>
    </div>
  );
}