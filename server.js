const express = require('express');
const app = express();

const posts = [
  {
    username: 'Turkay',
  },
];

app.get('/', async (req, res) => {
  res.send('Hello');
});

app.get('/posts', async (req, res) => {
  res.send('Hello');
});

app.listen(3000, () => {
  console.log(`server listen port ${3000}`);
});
