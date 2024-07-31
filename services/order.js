const Order = require('../models/orders');
const Books = require('../models/Books');

exports.getBooksSoldCount = async () => {
    try {
        const booksSold = await Order.aggregate([
            { $unwind: '$Order_Books' },
            {
                $group: {
                    _id: '$Order_Books.book',
                    totalSold: { $sum: '$Order_Books.quantity' }
                }
            },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'bookDetails'
                }
            },
            { $unwind: '$bookDetails' },
            {
                $project: {
                    _id: 0,
                    bookId: '$_id',
                    bookName: '$bookDetails.Book_Name',
                    totalSold: 1
                }
            }
        ]);
        console.log(booksSold)
        return booksSold;
    } catch (error) {
        console.error("Error fetching books sold count:", error);
        throw error;
    }
};

exports.getTotalIncomePerMonth = async () => {
    try {
        const incomePerMonth = await Order.aggregate([
            {
                $group: {
                    _id: { $month: "$Date" },
                    totalIncome: { $sum: "$Total_Price" }
                }
            },
            {
                $sort: { _id: 1 } 
            }
        ]);
        return incomePerMonth;
    } catch (error) {
        console.error("Error fetching total income per month:", error);
        throw error;
    }
};

exports.getTotalQuantitySoldPerMonth = async () => {
    try {
        const quantitySoldPerMonth = await Order.aggregate([
            { $unwind: '$Order_Books' },
            {
                $group: {
                    _id: { $month: "$Date" },
                    totalQuantity: { $sum: "$Order_Books.quantity" }
                }
            },
            {
                $sort: { _id: 1 } 
            }
        ]);
        return quantitySoldPerMonth;
    } catch (error) {
        console.error("Error fetching total quantity sold per month:", error);
        throw error;
    }
};

