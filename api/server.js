const express = require('express')
const server = express();

const authRouter = require('./auth/authRouter')
const usersRouter = require('./users/usersRouter')

server.use(express.json())
server.use('/auth', authRouter)
server.use('/users', usersRouter)

module.exports = server