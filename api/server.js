const express = require('express');
require('colors')
const userRouter = require('./users/users-router');
const { logger } = require('./middleware/middleware');
const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json());

// global middlewares and the user's router need to be connected here

server.use('/users', logger, userRouter);

server.use('/', logger, (req, res) => {
  res.status(200).send('base route')
});

module.exports = server;
