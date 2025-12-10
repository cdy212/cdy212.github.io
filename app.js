const express = require('express');
const app = express();
const port = 3000; // 중요: 방화벽 열어둔 포트와 일치해야 함

app.get('/', (req, res) => {
  res.send('Hello! 배포 자동화 성공입니다! 🎉');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});