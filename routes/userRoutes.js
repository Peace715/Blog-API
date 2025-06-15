const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/userController');

router.post('/signup', signup);
console.log('Signup response:', res.body )
router.post('/login', login);

module.exports = router;