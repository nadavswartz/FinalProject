const mongoose = require("mongoose")

// make new book schema using mongoose
const Books = new mongoose.Schema({
  Book_Name: {
    type: String,
    required: true,
  },
  Author: {
    type: String,
    required: true,
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
    data: Buffer,
    contentType: String,
  },
})

module.exports = mongoose.model('Books', Books);