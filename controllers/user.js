const userService = require('../services/user');
const User = require('../models/users');

//register function - gets all the values and redirect to /login
exports.register = async (req, res) => {
    try {
        const { username, password, email, firstname, lastname, address, city, zipcode, phonenumber, housenumber, floor} = req.body;
        await userService.register(username, password, email, firstname, lastname, address, city, zipcode, phonenumber, housenumber, floor);
        console.log( `${username} register now`) // for me to see that a user register propartly
        res.redirect('/login');
    } catch (error) {
        res.status(500).json({ errors: [error.message] });
    }
};

// use the login function in services and redirect the user to home page
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.login(email, password);
        if (user) {
            req.session.userId = user._id;
            console.log( `user ${user.username} login `, req.session.userId) // for me to see that a user login propartly + user._id
            res.redirect('/home');
        } else {
            res.status(401).json({ errors: ['Invalid email or password'] });
        }
    } catch (error) {
        res.status(500).json({ errors: [error.message] });
    }
};

exports.home = async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ errors: ['Unauthorized'] });
        }
        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.status(404).json({ errors: ['User not found'] });
        }
        res.render('home', {user});
    } catch (error) {   
        res.status(500).json({ errors: [error.message] });
    }
};

