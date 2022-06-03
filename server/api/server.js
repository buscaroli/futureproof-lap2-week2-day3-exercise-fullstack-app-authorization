const express = require('express')
require('dotenv').config()
const cors = require('cors')
const server = express()

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

const userRoutes = require('./controllers/users')
server.use('/users', userRoutes)

server.get('/', (req, res) => {
  res.send('Hello World!')
})

module.exports = server
