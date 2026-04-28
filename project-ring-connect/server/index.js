const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

const DB_FILE = './database.json';

// 주소를 '/api/save-message'로 확실히 고정!
app.post('/api/save-message', (req, res) => {
  const { name, message } = req.body;
  
  let data = [];
  if (fs.existsSync(DB_FILE)) {
    data = JSON.parse(fs.readFileSync(DB_FILE));
  }

  data.push({ 
    id: Date.now(), 
    name, 
    message, 
    createdAt: new Date().toLocaleString() 
  });

  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  console.log("저장 완료:", name);
  res.status(200).json({ success: true, message: "저장 성공" });
});

// 데이터 가져오기용 API
app.get('/api/users', (req, res) => {
  if (fs.existsSync(DB_FILE)) {
    return res.json(JSON.parse(fs.readFileSync(DB_FILE)));
  }
  res.json([]);
});

app.listen(PORT, () => console.log(`서버가 ${PORT}번에서 실행 중입니다.`));