const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const { name } = require("ejs");
//require('dotenv').config();


// make new user schema using mongoose
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