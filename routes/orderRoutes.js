const express = require('express');
const router = express.Router();
const statsController = require('../controllers/order');
const path = require('path');
const { isAdmin } = require('../middleware/auth');

router.get('/books-sold',isAdmin, statsController.getBooksSoldStats);
router.get('/income',isAdmin, statsController.getIncomeStats);
router.get('/quantity',isAdmin, statsController.getQuantityStats);

module.exports = router;