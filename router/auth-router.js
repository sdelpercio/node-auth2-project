const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./users-model');

const router = express.Router();

router.post('/register', (req, res) => {
	const userInfo = req.body;
	const hash = bcrypt.hashSync(userInfo.password, 8);
	userInfo.password = hash;

	db.add(userInfo)
		.then(newUser => {
			res.status(201).json(newUser);
		})
		.catch(err => {
			res.status(500).json({ error: 'issue creating user', err });
		});
});

module.exports = router;
