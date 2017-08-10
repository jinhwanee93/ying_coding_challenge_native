// Define table colmuns in this file
const Sequelize = require('sequelize');

// ElephantSQL cloud storage initialized in application, 
// thought that the application will not require too mich scaling
const PORTGRES_URL = require('../.env');

const db = new Sequelize(PORTGRES_URL)

// Defining USERS table
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

// Defining TASKS table
const Tasks = db.define('tasks', {
  entry: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isCompleted: {
    type: Sequelize.BOOLEAN,
  }
})

// Establishing relationships between USERS and TASKS
Users.hasMany(Tasks, { foreignKey: { name: 'user_id', allowNull: true }, onDelete: 'CASCADE' });
Tasks.belongsTo(Users, { foreignKey: { name: 'user_id', allowNull: true }, onDelete: 'CASCADE' });

// Syncing tables
Users.sync()
Tasks.sync()

// In case I need to nuke the whole database due to schema diagrams being changed

// Users.sync({ force: true })
// Tasks.sync({ force: true })


// Tool to help identify if the database has been successfully connected
db.authenticate()
  .then((err) => {
    console.log('Successful connection to the database');
  })
  .catch((err) => {
    console.log('Cannot connect to the databse due to:', err);
  })

// Exporting the tables
  module.exports = {
    Users: Users,
    Tasks: Tasks
  }