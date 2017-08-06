const express = require('express');
const router = express.Router();
const db = require('./db_config');
const utils = require('../utils/utils');
const bcrypt = require('bcryptjs');
// const Promise = require('bluebird');

// Defining routes for USER

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

// Debugging practices for users

router.get('/api/getUsers', (req, res) => {
  db.Users.findAll()
  .then(users => res.send(users))
  .catch(err => res.send(err))
})

// ===>
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

// router.post('/api/addUser', async (req, res) => {
//   try {

//     const salt = await bcrypt.genSalt(saltRounds)
//     const hash = await bcrypt.hash(req.body.password);
//     const person = await db.Users.findOne({ where: { username: req.body.username }})
    
//     if(person) {
//       res.send('user already exists, please log in instead')
//     } else {
//       db.Users.create({
//         username: req.body.username,
//         password: hash
//       })
//     res.send('Your credentials have been saved')
//     }
//   }
//   catch(err) {
//     res.send(err)
//   }
// })

router.post('/api/addUser', postUser)

module.exports = router;