const express = require('express')
const bodyParser = require('body-parser')

// Create express instnace
const app = express()

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Require API routes
const orders = require('./routes/orders')

// Import API Routes
app.use(orders)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
