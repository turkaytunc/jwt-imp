const express = require('express');
const bcrypt = require('bcrypt');
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

module.exports = router;