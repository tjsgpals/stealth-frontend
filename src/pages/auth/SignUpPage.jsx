import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './SignUpPage.module.css';

const API_BASE_URL = 'http://172.30.1.27:5000';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [idAvailable, setIdAvailable] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleIdCheck = async () => {
    if (!id.trim()) {
      alert('TEAM ID를 입력해주세요');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/check-id`, {
        username: id,
      });

      if (response.data.available) {
        setIdAvailable(true);
        alert('✓ 사용 가능한 TEAM ID입니다');
      } else {
        setIdAvailable(false);
        alert('✗ 이미 사용 중인 TEAM ID입니다');
      }
    } catch (error) {
      console.error('TEAM ID 중복확인 에러:', error);
      alert('TEAM ID 확인 중 오류가 발생했습니다');
    }
  };

  const handleJoinNow = async () => {
    if (!idAvailable) {
      alert('TEAM ID 중복확인을 완료해주세요');
      return;
    }

    if (!id || !password) {
      alert('모든 정보를 입력해주세요');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
        username: id,
        password: password,
      });

      if (response.data.success) {
        alert('회원가입 완료!');
        navigate('/login');
      } else {
        alert('회원가입 실패: ' + response.data.message);
      }
    } catch (error) {
      console.error('회원가입 에러:', error);
      alert('회원가입 중 오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = idAvailable && id && password;

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.square1}></div>
        <div className={styles.square2}></div>
      </div>

      <div className={styles.signupBox}>
        <h1 className={styles.title}>SIGN UP</h1>

        <div className={styles.inputsContainer}>
          {/* TEAM ID 입력 */}
          <div className={styles.inputField}>
            <label className={styles.label}>TEAM ID</label>
            <div className={styles.inputWithButton}>
              <input
                type="text"
                placeholder="ENTER YOUR TEAM ID"
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
        </div>

        {/* JOIN NOW 버튼 */}
        <div className={styles.buttonContainer}>
          <button
            className={styles.joinButton}
            onClick={handleJoinNow}
            disabled={!isFormValid || loading}
          >
            {loading ? 'LOADING...' : 'JOIN NOW'}
          </button>
        </div>
      </div>
    </div>
  );
}