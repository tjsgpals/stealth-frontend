import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../../context/GameContext';
import styles from './GameReadyPage.module.css';
import personIcon from '../../assets/icons/personIcon.png';

export default function GameReadyPage() {
  const navigate = useNavigate();
  const { tagger_id, score, time, setTime } = useGameContext();
  const [isLoading, setIsLoading] = useState(false);

  // 타이머 로직
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevTime => {
        if (prevTime <= 0) {
          clearInterval(timer);
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

  // SELECT TAGGER 버튼 클릭
  const handleSelectTagger = () => {
    navigate('/game/select-tagger');
  };

  // START 버튼 클릭
  const handleStart = () => {
    if (tagger_id === null || tagger_id === undefined) {
      alert('술래를 먼저 정해주세요!');
      return;
    }
    setIsLoading(true);
    // 약간의 딜레이 후 게임 시작
    setTimeout(() => {
      navigate('/game/play');
    }, 300);
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
        {/* 게임 영상 박스 */}
        <div className={styles.gameBox}>
          {isLoading && (
            <div className={styles.loading}>
              게임 시작 중...
            </div>
          )}
        </div>

        {/* 컨트롤 버튼들 */}
        <div className={styles.controlContainer}>
          {/* SELECT TAGGER 버튼 */}
          <button
            className={styles.selectTaggerBtn}
            onClick={handleSelectTagger}
            disabled={isLoading}
          >
            SELECT<br />TAGGER
          </button>

          {/* START 버튼 */}
          <button
            className={styles.startBtn}
            onClick={handleStart}
            disabled={isLoading}
          >
            START
          </button>
        </div>
      </div>

      {/* 프로필 아이콘 */}
      <button
        className={styles.profileIcon}
        onClick={handleMyPage}
        disabled={isLoading}
      >
        <img src={personIcon} alt="profile" />
      </button>
    </div>
  );
}