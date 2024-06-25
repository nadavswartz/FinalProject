const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const path = require('path');

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', userController.register);

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/books', (req, res) => {
  res.render('books');
})

router.get('/home', function (req, res) {
    res.sendFile('home.html', { root: path.join(__dirname, '../public') });
});

router.get('/bookpage', (req, res) => {
  res.render('bookpage');
})

router.post('/login', userController.login);

module.exports = router;