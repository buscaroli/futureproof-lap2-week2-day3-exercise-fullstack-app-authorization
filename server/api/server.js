const express = require('express')
const server = express()
const cors = require('cors')
const userRoutes = require('./controllers/users')

server.use(express.json())
server.use(cors('*'))
server.use('/users', userRoutes)

server.get('/', (req, res) => {
  res.send('Hello World!')
})

module.exports = server
