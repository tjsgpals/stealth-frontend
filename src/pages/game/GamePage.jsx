import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./GamePage.module.css";
import personIcon from "../../assets/icons/personIcon.png";

export default function GamePage() {
  const navigate = useNavigate();
  const [time, setTime] = useState(180); // 03:00 = 180초
  const [score, setScore] = useState(0); // 하드코딩용
  const [players] = useState([
    // ← setPlayers 제거!
    { id: 1, x: 300, y: 200, color: "#9b8fb8", size: 40 },
    { id: 2, x: 450, y: 280, color: "#423df3", size: 50 },
    { id: 3, x: 500, y: 290, color: "#a946ff", size: 35 },
  ]);

  // 게임 종료
  const handleGameEnd = useCallback(() => {
    // TODO: API 연결 - POST /game/end
    // axios.post(`${API_BASE_URL}/game/end`, { session_id, final_score: score })
    navigate("/game/over");
  }, [navigate]);

  // 타이머 로직
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          handleGameEnd();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [handleGameEnd]);

  // 시간을 MM:SS 형식으로 변환
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // 플레이어 태깅
  const handlePlayerClick = (playerId) => {
    console.log(`Player ${playerId} tagged!`);
    // TODO: WebSocket 이벤트 - 플레이어 태깅 처리
    // socket.emit('tag_player', { player_id: playerId });
    setScore(score + 10); // 임시로 +10점
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
        <div className={styles.timeDisplay}>{formatTime(time)}</div>
        <div className={styles.scoreDisplay}>
          SCORE: <span className={styles.scoreNumber}>{score}</span>
        </div>
      </div>

      {/* 메인 컨테이너 */}
      <div className={styles.mainContainer}>
        {/* 게임 영역 */}
        <div className={styles.gameBox}>
          {/* TODO: WebSocket 이벤트 - image_frame 받아서 영상 표시 */}
          {players.map((player) => (
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
        <button className={styles.endBtn} onClick={handleGameEnd}>
          END
        </button>
      </div>

      {/* 프로필 아이콘 */}
      <button className={styles.profileIcon} onClick={handleMyPage}>
        <img src={personIcon} alt="profile" />
      </button>
    </div>
  );
}
