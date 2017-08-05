const express = require('express');
const router = express.Router();
const db = require('./db_config');

// Defining routes for USER
router.post('/api/addUser', (req, res) => {
  db.Users.create({
    username: req.body.username,
    password: req.body.password
  })
  .then(user => res.send(user))
  .catch(err => res.send(err))
})

router.get('/api/getUsers', (req, res) => {
  db.Users.findAll()
  .then(users => res.send(users))
  .catch(err => res.send(err))
})

// Defining routes for tasks
router.post('/api/addTask', (req, res) => {
  db.Tasks.create({
    user_id: req.body.user_id,
    entry: req.body.entry,
    isCompleted: req.body.isCompleted
  })
  .then(task => res.send(task))
  .catch(err => res.send(err))
})

router.get('/api/getTasks/:user_id', (req, res) => {
  db.Tasks.find({
    where: { user_id: req.params.user_id }
  })
  .then(tasks => res.send(tasks))
  .catch(err => res.send(err))
})

// debugging the routes, identifying all the tasks in the database

router.get('/api/getAllTasks/', (req, res) => {
  db.Tasks.findAll()
  .then(tasks => res.send(tasks))
  .catch(err => res.send(err))
})

router.put('/api/updateTask/:task_id', (req, res) => {
  db.Tasks.findById(req.params.task_id)
  .then(data => {
    data.update({
      user_id: req.body.user_id,
      entry: req.body.entry,
      isCompleted: req.body.isCompleted
    }, res.send(data))
  })
  .catch(err => res.send(err))
})

router.delete('/api/deleteTask/:task_id', (req, res) => {
  db.Tasks.destroy({
    where: { id: req.params.task_id }
  }, res.send('Task has been deleted'))
  .catch(err => res.send(err))
})

// router.delete

module.exports = router;