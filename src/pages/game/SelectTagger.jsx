import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SelectTagger.module.css';

export default function SelectTagger() {
  const navigate = useNavigate();
  const [selectedTagger, setSelectedTagger] = useState(null);

  const handleExit = () => {
    navigate('/game/ready');
  };

  const handleSelectTagger = (taggerId) => {
    setSelectedTagger(taggerId);
    console.log('Selected tagger:', taggerId);
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.square1}></div>
        <div className={styles.square3}></div>
      </div>

      <button className={styles.exitBtn} onClick={handleExit}>
        EXIT
      </button>

      <div className={styles.mainContent}>
        <div className={styles.contentBox}>
          <div className={styles.placeholder}>
            <p>술래 선택 화면</p>
            <p style={{ fontSize: '12px', marginTop: '10px' }}>
              (백엔드 API에서 로드 예정)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}