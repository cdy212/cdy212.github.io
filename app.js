const express = require('express');
const path = require('path'); // 파일 경로 처리를 위한 모듈
const app = express();
const port = 8081;

// [변경] 정적 파일(Static Files) 제공 설정
// 'public' 폴더 안에 있는 파일들을 브라우저에서 접근 가능하게 합니다.
app.use(express.static(path.join(__dirname, 'public')));

// [변경] 루트 경로('/') 접속 시 index.html 파일 전송
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 서버 실행
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});