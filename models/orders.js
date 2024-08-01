const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    Total_Price: {
        type: Number,
        required: true,
    },
    Date: {
        type: Date,
        required: true,
        default: Date.now
    },
    User: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'User'
    },
    Order_Books: [{
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Books',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }]
});

module.exports = mongoose.model('Order', orderSchema);