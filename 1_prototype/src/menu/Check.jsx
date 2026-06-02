import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Check() {
  const [randomMsg, setRandomMsg] = useState('메시지를 불러오는 중...');
  const myName = localStorage.getItem('myUsername');
  const navigate = useNavigate();
  const hasAlerted = useRef(false);

  useEffect(() => {
    // 1. 로그인 여부 확인 및 보안 로직
    if (!myName) {
      if (!hasAlerted.current) {
        alert("로그인이 필요합니다!");
        hasAlerted.current = true;
        navigate('/');
      }
      return;
    }

    // 2. 타인의 메시지 랜덤 추출 로직
    const fetchRandomMessage = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5001/api/users');
        const data = await response.json();
        
        // 본인 이름 제외 필터링
        const othersMessages = data.filter(item => item.name !== myName);

        if (othersMessages.length > 0) {
          const randomIndex = Math.floor(Math.random() * othersMessages.length);
          setRandomMsg(othersMessages[randomIndex].message);
        } else {
          setRandomMsg("아직 도착한 다른 메시지가 없습니다.");
        }
      } catch (error) {
        setRandomMsg("서버 연결에 실패했습니다.");
      }
    };

    fetchRandomMessage();
  }, [myName, navigate]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h3>나에게 전달된 메시지</h3>
      <div style={{ 
        padding: '20px', 
        margin: '20px 0', 
        backgroundColor: '#f9f9f9', 
        borderRadius: '10px', 
        border: '1px solid #ddd' 
      }}>
        <strong>"{randomMsg}"</strong>
      </div>
      <Link to="/"><button>🏠 홈으로</button></Link>
    </div>
  );
}