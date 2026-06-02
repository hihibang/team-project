import { useState, useEffect, useRef } from 'react'; // 1. useRef 추가
import { useNavigate, Link } from 'react-router-dom';

function Main() {
  const [message, setMessage] = useState('');
  const [loginUser, setLoginUser] = useState('');
  const navigate = useNavigate();
  
  // 2. 알림창이 떴는지 기억하는 변수 (화면이 바뀌어도 유지됨)
  const hasAlerted = useRef(false);

  useEffect(() => {
    const savedName = localStorage.getItem('myUsername');
    
    if (!savedName) {
      // 3. 아직 알림을 안 띄웠을 때만 실행
      if (!hasAlerted.current) {
        alert("로그인이 필요합니다!");
        hasAlerted.current = true; // "나 이제 알림 띄웠어!"라고 기록
        navigate('/');
      }
    } else {
      setLoginUser(savedName);
    }
  }, [navigate]);

  // ... 나머지 handleSendMessage와 return 코드는 동일 ...

  const handleSendMessage = async () => {
  if (!message.trim()) return alert("메시지를 입력하세요!");

  try {
    const response = await fetch('http://127.0.0.1:5001/api/save-message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: loginUser, message: message }),
    });

    // 서버 응답 자체가 실패(404, 500 등)했는지 먼저 체크
    if (!response.ok) {
      throw new Error('서버 응답 에러');
    }

    const result = await response.json(); // 여기서 에러가 나면 catch로 감
    
    alert("메시지 전송 성공!");
    setMessage('');
    navigate('/mypage');

  } catch (error) {
    // 서버가 꺼진 건지, 코드가 틀린 건지 로그로 확인
    console.error("발생한 에러 상세내용:", error);
    
    if (error.message === 'Failed to fetch') {
        alert("백엔드 서버가 꺼져 있습니다!");
    } else {
        alert("데이터 처리 중 오류가 발생했습니다. 콘솔을 확인하세요.");
    }
  }
};

  return (
    <div style={{ padding: '20px' }}>
      <h2>메인 작업 공간</h2>
      <p>작성자: <strong>{loginUser}</strong></p>
      
      <textarea 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
        placeholder="아이디어나 메시지를 입력하세요..."
        style={{ width: '100%', height: '150px', padding: '10px' }}
      />
      <br />
      <button onClick={handleSendMessage} style={{ marginTop: '10px', width: '100%', padding: '10px' }}>
        메시지 서버로 보내기
      </button>
      <Link to="/">
        <button>🏠 홈으로</button>
      </Link>
    </div>
  );
}

export default Main;