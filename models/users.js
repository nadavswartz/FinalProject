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
    minlength: 6,
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
    match: [/.+\@.+\..+/, 'Please enter a valid email address'], // this is a way to validate that it's an email
    unique: true,
  },
  phonenumber: {
    type: Number,
    match: [/^05(0|2|3|4|5|8)\d{7}$/, 'Please enter a valid Israeli phone number'],
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