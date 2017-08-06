// Define table colmuns in this file
const Sequelize = require('sequelize');
const PORTGRES_URL = require('../.env');

const db = new Sequelize(PORTGRES_URL)

// Defining USERS tables for the application
const Users = db.define('users', {
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

const Tasks = db.define('tasks', {
  entry: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isCompleted: {
    type: Sequelize.BOOLEAN,
  }
})

Users.hasMany(Tasks, { foreignKey: { name: 'user_id', allowNull: true }, onDelete: 'CASCADE' });
Tasks.belongsTo(Users, { foreignKey: { name: 'user_id', allowNull: true }, onDelete: 'CASCADE' });

// Syncing tables
Users.sync()
Tasks.sync()

db.authenticate()
  .then((err) => {
    console.log('Successful connection to the database');
  })
  .catch((err) => {
    console.log('Cannot connect to the databse due to:', err);
  })

  module.exports = {
    Users: Users,
    Tasks: Tasks
  }