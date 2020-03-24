const express = require('express');
const db = require('./users-model');

const router = express.Router();

router.get('/users', (req, res) => {
	const department = req.decodedToken.department;

	db.findBy({ department })
		.then(users => {
			res.status(200).json(users);
		})
		.catch(err => {
			res.status(500).json({ error: 'issue getting users', err });
		});
});

module.exports = router;
