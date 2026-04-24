import { useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from './firebase,js'; // 여기서 에러가 난다면 파일 위치 문제일 수 있습니다.
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; 

function Home() {
  const [userName, setUserName] = useState('');

  const handleSave = async () => {
  console.log("로그 1: 함수 진입 성공");
  console.log("로그 2: 현재 입력값은 ->", userName);

  if (!userName || userName.trim() === '') {
    console.log("로그 3: 이름이 없어서 중단됨!");
    alert("이름을 꼭 입력해 주세요!");
    return;
  }

  try {
    console.log("로그 4: DB 저장 시도 직전...");
    const docRef = await addDoc(collection(db, "users"), {
      name: userName,
      createdAt: serverTimestamp()
    });
    console.log("로그 5: 저장 완료! 문서 ID:", docRef.id);
    alert("저장 성공!");
  } catch (e) {
    console.error("로그 6: 에러 발생!! ->", e);
    alert("에러가 났습니다. 콘솔을 보세요.");
  }
};

  return (
    <>
      <div style={{ padding: '20px' }}>
        <input value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="#name"/>
        <button onClick={handleSave}>이름 저장</button>
      </div>
      <nav style={{ padding: '20px' }}>
        <Link to="/main"><button>Main</button></Link>
        <Link to="/check"><button>Check</button></Link>
        <Link to="/mypage"><button>MyPage</button></Link>
      </nav>
    </>
  );
}
export default Home;