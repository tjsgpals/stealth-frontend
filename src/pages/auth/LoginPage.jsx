import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './LoginPage.module.css';
const API_BASE_URL = 'http://172.30.1.27:5000';
function LoginPage({ onLogin }) {
const navigate = useNavigate();
const [id, setId] = useState('');
const [password, setPassword] = useState('');
const [loading, setLoading] = useState(false);
const handleLogin = async () => {
if (!id || !password) {
alert('TEAM ID와 PASSWORD를 입력해주세요');
return;
    }
setLoading(true);
try {
const response = await axios.post(`${API_BASE_URL}/auth/login`, {
username: id,
password: password,
      });
if (response.data.success) {
alert('로그인 성공!');
localStorage.setItem('user_id', response.data.user_id);
localStorage.setItem('nickname', response.data.nickname);
onLogin();
navigate('/game/ready');
      } else {
alert('로그인 실패: ' + response.data.message);
      }
    } catch (error) {
console.error('로그인 에러:', error);
if (error.response?.status === 401) {
alert('TEAM ID 또는 PASSWORD가 일치하지 않습니다');
      } else if (error.response?.status === 404) {
alert('존재하지 않는 사용자입니다');
      } else {
alert('로그인 중 오류가 발생했습니다');
      }
    } finally {
setLoading(false);
    }
  };
const handleKeyPress = (e) => {
if (e.key === 'Enter') {
handleLogin();
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
<label className={styles.label}>TEAM ID</label>
<input
type="text"
className={styles.input}
placeholder="ENTER YOUR TEAM ID"
value={id}
onChange={(e) => setId(e.target.value)}
onKeyPress={handleKeyPress}
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
onKeyPress={handleKeyPress}
/>
</div>
</div>
<div className={styles.buttonContainer}>
<button
className={styles.loginBtn}
onClick={handleLogin}
disabled={loading}
>
{loading ? 'LOADING...' : 'LOGIN'}
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