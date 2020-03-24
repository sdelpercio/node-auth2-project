const express = require('express');
const morgan = require('morgan');

const authRouter = require('./router/auth-router');
const userRouter = require('./router/users-router');
const restricted = require('./router/restricted-middleware');

const server = express();

server.use(express.json());
server.use(morgan('dev'));

server.use('/api/auth', authRouter);
server.use('/api', restricted, userRouter);

server.get('/', (req, res) => {
	res.status(200).send('all goood');
});

module.exports = server;
