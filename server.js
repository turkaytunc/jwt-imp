const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const usersRouter = require('./users');

app.use(express.json());

const posts = [
  {
    username: 'Turkay',
    title: 'post-title',
  },
];

app.get('/', async (req, res) => {
  res.send('HomePage');
});

app.get('/posts', async (req, res) => {
  res.json(posts);
});

// Users Route
app.use('/users', usersRouter);

app.listen(3000, () => {
  console.log(`server listen http://localhost:${3000}`);
});
