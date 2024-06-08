const User = require('../models/users');
const bcrypt = require('bcrypt');

// register function that uses bcrypt in order to make the password hashed and make the new user and save in the DB
async function register(username, password, email, firstname, lastname, address, city, zipcode, phonenumber, housenumber, floor) {  
  const saltRounds = 6;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    password: hashedPassword,
    email,
    firstname,
    lastname,
    address,
    city,
    zipcode,
    phonenumber,
    housenumber,
    floor
  });

  await user.save();
}

// login function find a user by email and compare if the password is correct
async function login(email, password) {
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    return user;
  }
  return null;
}


module.exports = { register, login };
