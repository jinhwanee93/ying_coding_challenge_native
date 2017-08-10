const express = require('express');
const router = express.Router();
const db = require('./db_config');
const utils = require('../utils/utils');

// Attempted to hash the passwords using bcrypt, did not use it for this project
const bcrypt = require('bcryptjs');
const Promise = require('bluebird');

// Adding USER to the database, playing aronud with ES7 syntax for this route
const postUser = async (req, res) => {
  try {

    // Async await forces a function to return a promise...
    // Basically waiting for this line of code to finish 
    // and then executing the next line of code
    const person = await db.Users.findOne({ where: { username: req.body.username } });
    if (person) {
      res.send('That username is taken. Please try another email.');
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

// Debugging practice for identifying if the USERS are being plugged in correctly
router.get('/getUsers', (req, res) => {
  db.Users.findAll()
  .then(users => res.send(users))
  .catch(err => res.send(err))
})

// Route identifying USER information and checking if the username and password credentials match
router.get('/login/:username/:password', (req, res) => {
  db.Users.findOne({
    where: { 
      username: req.params.username,
      password: req.params.password
    }
  })
  .then(result => {
    if(!result) {
      res.send('Username and/or password does not match')
    } else {
      res.send({ user: result, id_token: utils.hasher(req.params.username)});
    }
  })
  .catch(err => res.send(err))
})

// Route to add a TASK
router.post('/addTask', (req, res) => {
  db.Tasks.create({
    user_id: req.body.user_id,
    entry: req.body.entry,
    isCompleted: req.body.isCompleted
  })
  .then(task => res.send(task))
  .catch(err => res.send(err))
})

// Route to identify the TASK_LIST by USER_ID
router.get('/getTasks/:user_id', (req, res) => {
  db.Tasks.findAll({
    where: { user_id: req.params.user_id }
  })
  .then(tasks => res.send(tasks))
  .catch(err => res.send(err))
})

// Debugging practice to identifying if the TASKS are in the database
router.get('/getAllTasks/', (req, res) => {
  db.Tasks.findAll()
  .then(tasks => res.send(tasks))
  .catch(err => res.send(err))
})

// Route to identify only one TASK in case data has to be front-loaded in a specified format
router.get('/getOneTask/:task_id', (req, res) => {
  db.Tasks.findById(req.params.task_id)
  .then(tasks => res.send(tasks))
  .catch(err => res.send(err))
})

// Route to update or edit a specific TASK 
router.put('/updateTask/:task_id', (req, res) => {
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

// Route to delete a specific TASK
router.delete('/deleteTask/:task_id', (req, res) => {
  db.Tasks.destroy({
    where: { id: req.params.task_id }
  }, res.send('Task has been deleted'))
  .catch(err => res.send(err))
})

// Route to filter if the TASK is COMPLETED or PENDING
router.get('/getCompletedTasks/:user_id/:isCompleted', (req, res) => {
  db.Tasks.findAll({
    where: { 
      user_id: req.params.user_id, 
      isCompleted: req.params.isCompleted
    }
  })
  .then(result => {
    res.send(result);
  })
  .catch(err => res.send(err))
})

// Previous ES7 practices
router.post('/addUser', postUser)

module.exports = router;