const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { isAdmin } = require('../middleware/auth');
const branchController = require('../controllers/Brunch');
const paymentController = require('../controllers/Books')

router.get('/register', (req, res) => {
  res.render('register');
});
router.post('/register', userController.register);

router.get('/login', (req, res) => {
  res.render('login');
});
router.post('/login', userController.login);

router.get('/about', (req, res) => {
  res.render('about');
});

router.get('/branches/add', isAdmin, branchController.showAddBranchForm);
router.post('/branches/add', isAdmin, branchController.addBranch);
router.get('/api/branches', branchController.getBranches);

router.get('/checkout', (req, res) => {
  const cartItems = req.session.cart;
  res.render('checkout', { cartItems });
});

router.post('/process-payment', paymentController.processPayment);

router.get('/approved', function(req, res) {
  res.render('approved');
});

router.get('/admin/dashboard', isAdmin, userController.renderAdminDashboard);

module.exports = router;
