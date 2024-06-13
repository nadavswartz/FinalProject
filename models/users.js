const mongoose = require("mongoose")
const bcrypt = require("bcrypt");

// make new user schema using mongoose
const user = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    match: [/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/, 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character'],
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address'], // email validation
    unique: true,
  },
  phonenumber: {
    type: String,
    match: [/(?:\+972|0)(?:[23489]|5\d{1})\d{7}$/, 'Please enter a valid phone number'] , //phone number validation
  },
  address: {
    type: String,
    required: true
  },
  housenumber: {
    type: Number
  },
  floor: {
    type: Number
  },
  city: {
    type: String,
  },
  zipcode: {
    type: Number,
  },
})

module.exports = mongoose.model('user', user);