import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameContext } from "../../context/useGameContext";
import styles from "./GameReadyPage.module.css";
import personIcon from "../../assets/icons/personIcon.png";

export default function GameReadyPage() {
  const navigate = useNavigate();
  const { tagger_id, score } = useGameContext();
  const [isLoading, setIsLoading] = useState(false);

  // SELECT TAGGER 버튼 클릭
  const handleSelectTagger = () => {
    navigate("/game/select-tagger");
  };

  // START 버튼 클릭
  const handleStart = () => {
    if (tagger_id === null || tagger_id === undefined) {
      alert("술래를 먼저 정해주세요!");
      return;
    }
    setIsLoading(true);
    // 약간의 딜레이 후 게임 시작
    setTimeout(() => {
      navigate("/game/play");
    }, 300);
  };

  // 프로필 아이콘 클릭
  const handleMyPage = () => {
    navigate("/mypage");
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
        <div className={styles.timeDisplay}>00:00</div>
        <div className={styles.scoreDisplay}>
          SCORE: <span className={styles.scoreNumber}>{score}</span>
        </div>
      </div>

      {/* 메인 컨테이너 */}
      <div className={styles.mainContainer}>
        {/* 게임 영상 박스 */}
        <div className={styles.gameBox}>
          {isLoading && <div className={styles.loading}>게임 시작 중...</div>}
        </div>

        {/* 컨트롤 버튼들 */}
        <div className={styles.controlContainer}>
          {/* SELECT TAGGER 버튼 */}
          <button
            className={styles.selectTaggerBtn}
            onClick={handleSelectTagger}
            disabled={isLoading}
          >
            SELECT
            <br />
            TAGGER
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
