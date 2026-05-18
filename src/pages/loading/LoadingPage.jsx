import styles from './LoadingPage.module.css';

export default function LoadingPage() {
  return (
    <div className={styles.container}>
      {/* 배경 */}
      <div className={styles.background}>
        <div className={styles.square1}></div>
        <div className={styles.square2}></div>
        <div className={styles.square3}></div>
        <div className={styles.square4}></div>
      </div>

      {/* 로딩 컨텐츠 */}
      <div className={styles.content}>
        {/* 3x3 그리드 애니메이션 */}
        <div className={styles.gridContainer}>
          <div className={`${styles.gridItem} ${styles.color1}`}></div>
          <div className={`${styles.gridItem} ${styles.color2}`}></div>
          <div className={`${styles.gridItem} ${styles.color3}`}></div>
          
          <div className={`${styles.gridItem} ${styles.color4}`}></div>
          <div className={`${styles.gridItem} ${styles.color5}`}></div>
          <div className={`${styles.gridItem} ${styles.color6}`}></div>
          
          <div className={`${styles.gridItem} ${styles.color7}`}></div>
          <div className={`${styles.gridItem} ${styles.color8}`}></div>
          <div className={`${styles.gridItem} ${styles.color9}`}></div>
        </div>

        {/* 로딩 텍스트 */}
        <p className={styles.loadingText}>LOADING...</p>

        {/* 로딩 점들 */}
        <div className={styles.dots}>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
        </div>
      </div>
    </div>
  );
}