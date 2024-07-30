const Branch = require('../models/brunch');

exports.deletebranch = async (name) => {
    try {
        const branchToDelete = await Branch.findOne({name});
        if (branchToDelete) {
            await branchToDelete.deleteOne();
        } else {
            throw new Error('No branch found with the provided name');
        }
    } catch (error) {
        console.log('Error delete branch:', error);
        throw error;
    }
}

exports.updateBranch = async (name, newBranchData) => {
    try {
        const branchToUpdate = await Branch.findOne({ name });
        if (!branchToUpdate) {
            throw new Error('Branch not found');
        }
        branchToUpdate.location.lat = Number(newBranchData.lat);
        branchToUpdate.location.lng = Number(newBranchData.lng);
        await branchToUpdate.save();
        return branchToUpdate;
    } catch (error) {
        console.error('Error updating branch:', error);
        throw error;
    }
};