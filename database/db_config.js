// Define table colmuns in this file
const Sequelize = require('sequelize');
const PORTGRES_URL = require('../.env');

const db = new Sequelize(PORTGRES_URL)

// Defining USERS tables for the application
const Users = db.define('users', {
  username: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  password: {
    type: Sequelize.STRING(20),
    allowNull: false
  }
})

const Tasks = db.define('tasks', {
  entry: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  isCompleted: {
    type: Sequelize.BOOLEAN(),
  }
})

// School.hasMany(User, { foreignKey: { name: 'school_id', allowNull: true }, onDelete: 'CASCADE' });

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