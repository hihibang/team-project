import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MyPage() {
  const [myList, setMyList] = useState([]);
  const [myName, setMyName] = useState('');

  useEffect(() => {
    // 1. 로컬스토리지에서 내 이름 가져오기
    const savedName = localStorage.getItem('myUsername');
    setMyName(savedName);

    // 2. 서버에서 전체 데이터 가져오기
    const fetchMyMessages = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5001/api/users');
        const allData = await response.json();
        
        // 3. 전체 데이터 중 내 이름(savedName)과 일치하는 것만 필터링
        const filteredData = allData.filter(item => item.name === savedName);
        setMyList(filteredData);
      } catch (error) {
        console.error("데이터를 가져오는데 실패했습니다:", error);
      }
    };

    if (savedName) fetchMyMessages();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>마이페이지</h2>
      <p><strong>{myName}</strong>님이 작성한 기록들입니다.</p>
      
      <div style={{ marginTop: '20px' }}>
        {myList.length === 0 ? (
          <p>아직 작성된 메시지가 없네요!</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {myList.map((item) => (
              <li key={item.id} style={{ 
                borderBottom: '1px solid #ddd', 
                padding: '10px 0',
                marginBottom: '10px' 
              }}>
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{item.message}</div>
                <div style={{ color: '#888', fontSize: '0.8rem' }}>{item.createdAt}</div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Link to="/">
        <button>🏠 홈으로</button>
        </Link>
    </div>
  );
}

export default MyPage;