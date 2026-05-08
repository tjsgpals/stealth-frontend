import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';

function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (id && password) {
      onLogin();
      navigate('/loading');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.square1}></div>
        <div className={styles.square2}></div>
      </div>

      <div className={styles.loginBox}>
        <h1 className={styles.title}>LOGIN</h1>

        <div className={styles.inputsContainer}>
          <div className={styles.inputField}>
            <label className={styles.label}>ID</label>
            <input
              type="text"
              className={styles.input}
              placeholder="ENTER YOUR ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>

          <div className={styles.inputField}>
            <label className={styles.label}>PASSWORD</label>
            <input
              type="password"
              className={styles.input}
              placeholder="ENTER PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.loginBtn} onClick={handleLogin}>
            LOGIN
          </button>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.signupSection}>
          <p className={styles.signupText}>DON'T HAVE AN ACCOUNT?</p>
          <button 
            className={styles.signupBtn}
            onClick={() => navigate('/signup')}
          >
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;