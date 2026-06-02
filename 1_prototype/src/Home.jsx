import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Home() {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  // [입장 기능]
  const handleJoin = async () => {
    if (!userName.trim()) return alert("이름을 입력하세요!");

    try {
      localStorage.setItem('myUsername', userName.trim());
      alert("입장 성공!");
    } catch (error) {
      alert("서버 연결 실패");
    }
  };

  // [로그아웃 기능] - 로컬스토리지 지우기
  const handleLogout = () => {
    localStorage.removeItem('myUsername');
    alert("로그아웃 되었습니다. 이제 새로운 이름을 등록할 수 있습니다.");
    setUserName(''); // 입력창 비우기
  };

  return (
    <div>
      <h2>입장하기</h2>
      <input 
       autoFocus 
       onMouseEnter={(e) => e.target.focus()}
       value={userName} 
       onChange={(e) => setUserName(e.target.value)} 
       placeholder="이름을 입력하세요"/>
      <button onClick={handleJoin}>시작</button>
      <button onClick={handleLogout} style={{ marginLeft: '10px', color: 'red' }}>
        로그아웃
      </button>

      <hr />
      <nav>
        <Link to="/main"><button>Main</button></Link>
        <Link to="/check"><button>Check</button></Link>
        <Link to="/mypage"><button>MyPage</button></Link>
      </nav>
    </div>
  );
}

export default Home;