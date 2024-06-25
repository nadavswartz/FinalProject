const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const { name } = require("ejs");

// make new user schema using mongoose
const Books = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Books', Books);