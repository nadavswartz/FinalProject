const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    Total_Price: {
        type: Number,
        required: true,
    },
    Date: {
        type: Date,  // Change to Date for easier handling
        required: true,
        default: Date.now
    },
    User: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User schema
        required: true,
        ref: 'User'
    },
    Order_Books: [{
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }]
});

module.exports = mongoose.model('Order', orderSchema);