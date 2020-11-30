require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.use(express.json());

let users = [];

router.get('/', async (req, res) => {
  res.json(users);
});

router.post('/signup', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);

    res.status(201).send('Signed-Up');
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

router.post('/login', async (req, res) => {
  const user = users.find((user) => user.name === req.body.name);
  if (user == null) {
    return res.status(400).send('User not found');
  }
  try {
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (isPasswordMatch) {
      const jwtUser = { name: user.name };
      const accessToken = jwt.sign(jwtUser, process.env.ACCESS_TOKEN);
      res.json({ accessToken });
    } else {
      res.send('Failed to login');
    }
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
