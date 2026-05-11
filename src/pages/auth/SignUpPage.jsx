// src/pages/auth/SignUpPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './SignUpPage.module.css';

const API_BASE_URL = 'http://172.30.1.27:5000';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [nickname, setNickname] = useState('');
  const [idAvailable, setIdAvailable] = useState(false);
  const [nicknameAvailable, setNicknameAvailable] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleIdCheck = async () => {
    if (!id.trim()) {
      alert('ID를 입력해주세요');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/check-id`, {
        username: id,
      });

      if (response.data.available) {
        setIdAvailable(true);
        alert('✓ 사용 가능한 ID입니다');
      } else {
        setIdAvailable(false);
        alert('✗ 이미 사용 중인 ID입니다');
      }
    } catch (error) {
      console.error('ID 중복확인 에러:', error);
      alert('ID 확인 중 오류가 발생했습니다');
    }
  };

  const handleNicknameCheck = async () => {
    if (!nickname.trim()) {
      alert('닉네임을 입력해주세요');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/check-nickname`, {
        nickname: nickname,
      });

      if (response.data.available) {
        setNicknameAvailable(true);
        alert('✓ 사용 가능한 닉네임입니다');
      } else {
        setNicknameAvailable(false);
        alert('✗ 이미 사용 중인 닉네임입니다');
      }
    } catch (error) {
      console.error('닉네임 중복확인 에러:', error);
      alert('닉네임 확인 중 오류가 발생했습니다');
    }
  };

  const handlePasswordCheck = () => {
    if (!password || !passwordCheck) {
      alert('비밀번호를 입력해주세요');
      return;
    }

    if (password === passwordCheck) {
      setPasswordMatch(true);
      alert('✓ 비밀번호가 일치합니다');
    } else {
      setPasswordMatch(false);
      alert('✗ 비밀번호가 일치하지 않습니다');
    }
  };

  const handleJoinNow = async () => {
    if (!idAvailable) {
      alert('ID 중복확인을 완료해주세요');
      return;
    }

    if (!nicknameAvailable) {
      alert('닉네임 중복확인을 완료해주세요');
      return;
    }

    if (!passwordMatch) {
      alert('비밀번호 확인을 완료해주세요');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
        username: id,
        password: password,
        nickname: nickname,
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

  const isFormValid = idAvailable && nicknameAvailable && passwordMatch && id && password && passwordCheck && nickname;

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

          {/* NICKNAME 입력 */}
          <div className={styles.inputField}>
            <label className={styles.label}>NICKNAME</label>
            <div className={styles.inputWithButton}>
              <input
                type="text"
                placeholder="ENTER YOUR NICKNAME"
                className={styles.input}
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <button
                className={styles.checkButton}
                onClick={handleNicknameCheck}
              >
                중복확인
              </button>
            </div>
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