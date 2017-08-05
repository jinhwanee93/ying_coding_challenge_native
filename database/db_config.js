// Define table colmuns in this file
const Sequelize = require('sequelize');
const PORTGRES_URL = require('../.env');

const db = new Sequelize(PORTGRES_URL)

// Defining USERS tables for the application
const Users = db.define('users', {
  username: {
    type: Sequelize.STRING(20)
  },
  password: {
    type: Sequelize.STRING(20)
  }
})

// Syncing tables
Users.sync()

db.authenticate()
  .then((err) => {
    console.log('Successful connection to the database');
  })
  .catch((err) => {
    console.log('Cannot connect to the databse due to:', err);
  })

  module.exports = {
    Users: Users
  }