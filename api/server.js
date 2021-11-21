const express = require('express');
require('colors')
const userRouter = require('./users/users-router');
const { logger } = require('./middleware/middleware');
const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json());

// global middlewares and the user's router need to be connected here

server.use(logger);
server.use('/api/users', userRouter)

server.get('/', logger, (req, res) => {
  res.send('Time to write some middleware!')
});

module.exports = server;
