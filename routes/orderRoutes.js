const express = require('express');
const router = express.Router();
const statsController = require('../controllers/order');
const path = require('path');
const { isAdmin } = require('../middleware/auth');

router.get('/books-sold', statsController.getBooksSoldStats);
router.get('/income', statsController.getIncomeStats);
router.get('/quantity', statsController.getQuantityStats);

module.exports = router;