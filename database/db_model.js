const express = require('express');
const router = express.Router();
const db = require('./db_config');

// Defineing routes for USER
router.post('/api/addUser', (req, res) => {
  db.Users.create({
    username: req.body.username,
    password: req.body.password
  })
  .then(user => res.send(user))
  .catch(err => res.send(err))
})

router.get('/api/getAllUsers', (req, res) => {
  db.Users.findAll()
  .then(user => res.send(user))
  .catch(err => res.send(err))
})

module.exports = router;