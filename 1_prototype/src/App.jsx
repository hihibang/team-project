import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home.jsx'; // 분리한 Home 가져오기
import Main from './menu/Main.jsx';
import Check from './menu/Check.jsx';
import MyPage from './menu/MyPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/check" element={<Check />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;