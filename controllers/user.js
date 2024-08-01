const userService = require('../services/user');
const User = require('../models/users');
const {isAdmin} = require('../middleware/auth')


exports.register = async (req, res, next) => {
    try {
        const { username, password, email, firstname, lastname, address, city, zipcode, phonenumber, housenumber, floor} = req.body;
        await userService.register(username, password, email, firstname, lastname, address, city, zipcode, phonenumber, housenumber, floor);
        res.redirect('/login');
    } catch (error) {
        next(error);
    }
};


exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userService.login(email, password);
        if (user) {
            req.session.userId = user._id;
            req.session.username = user.username;
            res.redirect('/home');
        } else {
            const err = new Error('Invalid email or password');
            err.status = 401;
            next(err);
        }
    } catch (error) {
        next(error);
    }
};

exports.home = async (req, res, next) => {
    try {
        if (!req.session.userId) {
            const err = new Error('Unauthorized');
            err.status = 401;
            return next(err);
        }
        const user = await User.findById(req.session.userId);
        if (!user) {
            const err = new Error('User not found');
            err.status = 404;
            return next(err);
        }
        res.render('home', {user});
    } catch (error) {   
        next(error);
    }
};

exports.renderAdminDashboard = async (req, res, next) => {
    try {
        if (!req.session.userId) {
            return res.redirect('/login');
        }
        res.render('adminDashboard');
    } catch (error) {
        next(error);
    }
};

