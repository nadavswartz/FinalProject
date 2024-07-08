const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const bookController = require('../controllers/Books')
const path = require('path');

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', userController.register);

router.get('/login', (req, res) => {
  res.render('login');
});


router.get('/about', (req, res) => {
  res.render('about');
})

router.get('/home', bookController.renderHomePage); 

router.get('/bookpage/:Book_Name', bookController.renderBookPage);

router.get('/books', (req, res) => {
  res.render('books');
})

router.post('/books', bookController.addBook);

router.post('/login', userController.login);


module.exports = router;