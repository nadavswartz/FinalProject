const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { isAdmin } = require('../middleware/auth');
const branchController = require('../controllers/Brunch');

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


module.exports = router;
