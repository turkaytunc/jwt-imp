require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

const posts = [
  {
    username: 'Enes',
    title: 'post-title',
    body: 'this body contains random words.',
  },
  {
    username: 'Onur',
    title: 'post-title',
    body: 'this body contains random words.',
  },
];

router.use(express.json());

router.get('/', authenticate, async (req, res) => {
  const fPosts = posts.filter((post) => post.username === req.user.name);
  res.json(fPosts);
});

function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = router;
