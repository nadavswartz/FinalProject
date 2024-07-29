const Branch = require('../models/brunch'); 

exports.showAddBranchForm = (req, res, next) => {
  try {
    res.render('brunch');
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
    res.render('/about')
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
