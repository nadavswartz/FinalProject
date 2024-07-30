const Branch = require('../models/brunch'); 
const branchService = require('../services/branch');

exports.showAddBranchForm = (req, res, next) => {
  try {
    res.render('brunch');
  } catch (err) {
    next(err);
  }
};

exports.showDeleteBranchForm = (req, res, next) => {
  try {
    res.render('deleteBranch');
  } catch (err) {
    next(err);
  }
};

exports.deleteBranch = async (req, res, next) => {
  try {
    const { name } = req.body;
    await branchService.deletebranch(name);
    res.render('deleteBranch')
  } catch (err) {
    next(err);
  }
};

exports.addBranch = async (req, res, next) => {
  try {
    const { name, lat, lng } = req.body;
    if (!name || !lat || !lng) {
      const err = new Error('All fields are required');
      err.status = 400;
      return next(err);
    }
    const newBranch = new Branch({ name, location: { lat, lng } });
    await newBranch.save();
    res.render('about')
  } catch (err) {
    next(err);
  }
};

exports.getBranches = async (req, res, next) => {
  try {
    const branches = await Branch.find();
    res.json(branches);
  } catch (err) {
    next(err);
  }
};

exports.updateBranch = async (req, res, next) => {
  try {
      const  { name, lat, lng } = req.body;
      console.log(req.body); 
      const updatedBranch = await branchService.updateBranch(name, { lat, lng } );
      if (!updatedBranch) {
          res.status(404).send('Branch not found');
          return;
      }
      res.redirect('/branches/update');
  } catch (error) {
      next(error);
  }
};
