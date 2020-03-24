const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./users-model');
const { jwtSecret } = require('../config/secrets');

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
router.post('/login', (req, res) => {
	const { username, password } = req.body;

	db.findBy({ username })
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = generateToken(user);
				res
					.status(200)
					.json({ message: `welcome ${user.username}!`, token: token });
			} else {
				res.status(403).json({ message: 'You shall not pass!' });
			}
		});
});

function generateToken(user) {
	const payload = {
		subject: user.id,
		username: user.username,
		department: user.department
	};

	const options = {
		expiresIn: '2h'
	};

	return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
