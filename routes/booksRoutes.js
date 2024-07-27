const express = require('express');
const router = express.Router();
const bookController = require('../controllers/Books');
const path = require('path');
const { isAuthenticated } = require('../middleware/auth');
const { isAdmin } = require('../middleware/auth');

router.get('/home', bookController.renderHomePage);

router.get('/bookpage/:Book_Name', bookController.renderBookPage);

router.get('/books',isAdmin, (req, res) => {
  res.render('books'); 
});
router.post('/books',isAdmin, bookController.addBook);

router.get('/cart', isAuthenticated, bookController.renderCartPage);
router.post('/cart', isAuthenticated, bookController.addToCart);



module.exports = router;
