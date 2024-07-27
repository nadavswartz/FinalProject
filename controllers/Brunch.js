const Branch = require('../models/brunch'); 

exports.showAddBranchForm = (req, res) => {
  res.render('brunch'); 
};

exports.addBranch = async (req, res) => {
  try {
    const { name, lat, lng } = req.body;
    if (!name || !lat || !lng) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const newBranch = new Branch({ name, location: { lat, lng } });
    await newBranch.save();
    res.render('/about')
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getBranches = async (req, res) => {
  try {
    const branches = await Branch.find();
    res.json(branches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
