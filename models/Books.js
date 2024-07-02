const mongoose = require("mongoose")

// make new book schema using mongoose
const Books = new mongoose.Schema({
  Book_Name: {
    type: String,
    required: true,
  },
  Author: {
    type: String,
    required: false,
  },
  Year: {
    type: Number,
    required: true,
  },
  Quantity: {
    type: Number,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  }

})

module.exports = mongoose.model('Books', Books);