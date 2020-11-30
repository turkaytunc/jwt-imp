const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const usersRouter = require('./users');
const postsRouter = require('./posts');

app.use(express.json());

app.get('/', async (req, res) => {
  res.send('HomePage');
});

app.use('/posts', postsRouter);

// Users Route
app.use('/users', usersRouter);

app.listen(3000, () => {
  console.log(`server listen http://localhost:${3000}`);
});
