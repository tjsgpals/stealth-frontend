import { useNavigate } from 'react-router-dom';
import styles from './MainPage.module.css';

function MainPage({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.square1}></div>
        <div className={styles.square2}></div>
        <div className={styles.square3}></div>
        <div className={styles.square4}></div>
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>STEALTH</h1>
        <p className={styles.subtitle}>VR MOTION DETECTION GAME</p>

        <div className={styles.buttons}>
          <button 
            className={styles.loginBtn}
            onClick={() => navigate('/login')}
          >
            LOGIN
          </button>
          
          <button 
            className={styles.enterBtn}
            onClick={() => navigate('/game/ready')}
          >
            ENTER
          </button>
        </div>

        {isLoggedIn && (
          <button 
            className={styles.logoutBtn}
            onClick={() => {
              onLogout();
              navigate('/');
            }}
          >
            LOGOUT
          </button>
        )}
      </div>
    </div>
  );
}

export default MainPage;