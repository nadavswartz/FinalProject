const orderService = require('../services/order');
const Order = require('../models/orders'); 

exports.getBooksSoldStats = async (req, res) => {
    try {
        const booksSoldStats = await orderService.getBooksSoldCount();
        res.render('booksSold', { booksSoldStats });
    } catch (error) {
        console.error("Error getting books sold stats:", error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getIncomeStats = async (req, res) => {
    try {
        const income = await orderService.getTotalIncomePerMonth();
        res.render('incomeStat', { income });
    } catch (error) {
        console.error("Error getting income stats:", error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getQuantityStats = async (req, res) => {
    try {
        const quantityStat = await orderService.getTotalQuantitySoldPerMonth();
        res.render('quantityStat', { quantityStat });
    } catch (error) {
        console.error("Error getting quantity stats:", error);
        res.status(500).send('Internal Server Error');
    }
};
