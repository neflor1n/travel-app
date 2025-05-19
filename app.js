const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Привет! Перейдите на /travel чтобы увидеть моё любимое место для путешествий');
});

app.get('/travel', (req, res) => {
  res.send('Моё любимое место для путешествий — Япония.');
});

app.listen(port, () => {
  console.log(`Приложение запущено на порту ${port}`);
});
