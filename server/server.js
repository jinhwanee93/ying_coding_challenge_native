const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('../database/db_config');
const routes = require('../database/db_routes');

// Define port access
const PORT = process.env.PORT || 8082;

// Define the express server
// Using dev tools like morgan to identify statusCode and see if the request went through
const app = express()
  .use(morgan('dev'))
  .use(cors())
  
  // Parsing body of the request in { Content-type: application/json } or { Content-type: x-www-form-urlencoded }
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use('/', routes)

// Define server, listening on specified port
const server = app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})

