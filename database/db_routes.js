const express = require('express');
const router = express.Router();
const db = require('./db_config');
const utils = require('../utils/utils');
const bcrypt = require('bcryptjs');
const Promise = require('bluebird');

// Adding users to the database, playing aronud with ES7 syntax for this route
const postUser = async (req, res) => {
  try {
    const person = await db.Users.findOne({ where: { username: req.body.username } });
    if (person) {
      res.send('That email is taken. Please try another email.');
    } else {
      const newUser = await db.Users.create({
        username: req.body.username,
        password: req.body.password,
      }) 
      res.send({ user: newUser, id_token: utils.hasher(req.body.username) });
    }
  } catch (error) {
    res.send(error);
  }
};

// Debugging practice for identifying if the users are being plugged in correctly
router.get('/api/getUsers', (req, res) => {
  db.Users.findAll()
  .then(users => res.send(users))
  .catch(err => res.send(err))
})

// Getting information if the username and password credentials match
router.get('/api/login/:username/:password', (req, res) => {
  console.log('what is the request that we are getting here?', req.params)
  db.Users.findOne({
    where: { 
      username: req.params.username,
      password: req.params.password
    }
  })
  .then(result => {
    console.log('what is the result? ', result)
    if(!result) {
      res.send('Username and/or password does not match')
    } else {
      res.send({ user: result, id_token: utils.hasher(req.params.username)});
    }
  })
  .catch(err => res.send(err))
})

// Adding tasks to the database
router.post('/api/addTask', (req, res) => {
  db.Tasks.create({
    user_id: req.body.user_id,
    entry: req.body.entry,
    isCompleted: req.body.isCompleted
  })
  .then(task => res.send(task))
  .catch(err => res.send(err))
})

// Identifying a task by used id
router.get('/api/getTasks/:user_id', (req, res) => {
  db.Tasks.find({
    where: { user_id: req.params.user_id }
  })
  .then(tasks => res.send(tasks))
  .catch(err => res.send(err))
})

// Debugging the routes, identifying all the tasks in the database
router.get('/api/getAllTasks/', (req, res) => {
  db.Tasks.findAll()
  .then(tasks => res.send(tasks))
  .catch(err => res.send(err))
})

// Identifying only one tasks in case data has to be front-loaded in a specified format
router.get('/api/getOneTask/:task_id', (req, res) => {
  db.Tasks.findById(req.params.task_id)
  .then(tasks => res.send(tasks))
  .catch(err => res.send(err))
})

// Applying update functionality in case of an edit for a specific task
router.put('/api/updateTask/:task_id', (req, res) => {
  console.log('what is the request coming through here? ', req.body, res.body)
  db.Tasks.findById(req.params.task_id)
  .then((data) => {
    data.update({
      user_id: req.body.user_id,
      entry: req.body.entry,
      isCompleted: req.body.isCompleted
    })
    .then(result => res.send(result))
  })
  .catch(err => res.send(err))
})

// Applied a deleting route for deletion functionality
router.delete('/api/deleteTask/:task_id', (req, res) => {
  db.Tasks.destroy({
    where: { id: req.params.task_id }
  }, res.send('Task has been deleted'))
  .catch(err => res.send(err))
})

// Previous ES7 practices
router.post('/api/addUser', postUser)

module.exports = router;