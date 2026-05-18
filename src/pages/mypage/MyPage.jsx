import { useNavigate } from 'react-router-dom';
import styles from './MyPage.module.css';

export default function MyPage() {
  const navigate = useNavigate();

  // 하드코딩용 게임 기록 데이터 (10개)
  const gameRecords = [
    { id: 0, date: '2026-05-18', time: '14:32:15', tag: 8 },
    { id: 1, date: '2026-05-01', time: '14:35:42', tag: 2 },
    { id: 2, date: '2026-05-01', time: '14:38:20', tag: 5 },
    { id: 3, date: '2026-05-01', time: '14:42:03', tag: 7 },
    { id: 4, date: '2026-05-01', time: '14:42:03', tag: 4 },
    { id: 5, date: '2026-05-01', time: '14:42:03', tag: 1 },
    { id: 6, date: '2026-05-01', time: '14:42:03', tag: 3 },
    { id: 7, date: '2026-05-01', time: '14:42:03', tag: 6 },
    { id: 8, date: '2026-05-01', time: '14:42:03', tag: 8 },
    { id: 9, date: '2026-05-01', time: '14:45:18', tag: 7 },
  ];

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      {/* 배경 장식 */}
      <div className={styles.background}>
        <div className={styles.square1}></div>
        <div className={styles.square2}></div>
        <div className={styles.square3}></div>
      </div>

      {/* 상단 헤더 */}
      <div className={styles.headerSection}>
        <button className={styles.backBtn} onClick={handleBackClick}>
          ←
        </button>
        <h1 className={styles.title}>GAME RECORDS</h1>
      </div>

      {/* 테이블 */}
      <div className={styles.tableContainer}>
        <div className={styles.tableWrapper}>
          {/* 헤더 */}
          <div className={styles.tableHeader}>
            <div className={styles.headerCell}>TEAM ID</div>
            <div className={styles.headerCell}>DATE</div>
            <div className={styles.headerCell}>TIME</div>
            <div className={styles.headerCell}>TAG</div>
          </div>

          {/* 데이터 행 */}
          {gameRecords.map((record, index) => (
            <div key={record.id} className={styles.tableRow}>
              <div className={styles.cell}>#{index}</div>
              <div className={styles.cell}>{record.date}</div>
              <div className={styles.cell}>{record.time}</div>
              <div className={styles.cellTag}>{record.tag}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}