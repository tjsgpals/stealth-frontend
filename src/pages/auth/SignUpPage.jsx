// src/pages/auth/SignUpPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignUpPage.module.css';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [idAvailable, setIdAvailable] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);

  const handleIdCheck = () => {
    if (id.trim().length > 0) {
      setIdAvailable(true);
      alert('사용 가능한 ID입니다');
    } else {
      alert('ID를 입력해주세요');
    }
  };

  const handlePasswordCheck = () => {
    if (password === passwordCheck && password.length > 0) {
      setPasswordMatch(true);
      alert('비밀번호가 일치합니다');
    } else {
      alert('비밀번호가 일치하지 않습니다');
    }
  };

  const handleJoinNow = () => {
    if (idAvailable && passwordMatch && id && password && passwordCheck) {
      alert('회원가입 완료!');
      navigate('/login');
    }
  };

  const isFormValid = idAvailable && passwordMatch && id && password && passwordCheck;

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.square1}></div>
        <div className={styles.square2}></div>
      </div>

      <div className={styles.signupBox}>
        <h1 className={styles.title}>SIGN UP</h1>

        <div className={styles.inputsContainer}>
          {/* ID 입력 */}
          <div className={styles.inputField}>
            <label className={styles.label}>ID</label>
            <div className={styles.inputWithButton}>
              <input
                type="text"
                placeholder="ENTER YOUR ID"
                className={styles.input}
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <button
                className={styles.checkButton}
                onClick={handleIdCheck}
              >
                중복확인
              </button>
            </div>
          </div>

          {/* PASSWORD 입력 */}
          <div className={styles.inputField}>
            <label className={styles.label}>PASSWORD</label>
            <input
              type="password"
              placeholder="ENTER PASSWORD"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* PASSWORD CHECK 입력 */}
          <div className={styles.inputField}>
            <label className={styles.label}>PASSWORD CHECK</label>
            <div className={styles.inputWithButton}>
              <input
                type="password"
                placeholder="RE-ENTER PASSWORD"
                className={styles.input}
                value={passwordCheck}
                onChange={(e) => setPasswordCheck(e.target.value)}
              />
              <button
                className={styles.checkButton}
                onClick={handlePasswordCheck}
              >
                확인
              </button>
            </div>
          </div>
        </div>

        {/* JOIN NOW 버튼 */}
        <div className={styles.buttonContainer}>
          <button
            className={styles.joinButton}
            onClick={handleJoinNow}
            disabled={!isFormValid}
          >
            JOIN NOW
          </button>
        </div>
      </div>
    </div>
  );
}