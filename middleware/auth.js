const passport = require('passport');

const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    console.log('User authenticated:', req.session.userId); // Debugging line
    return next();
  }
  res.redirect('/login');
};

const isAdmin = (req, res, next) => {
  // Check if the user is authenticated and has the admin role
  if (req.session && req.session.userId === '665dc07a683063bb39ecd00c') {
    console.log('Admin access granted:', req.session.userId); // Debugging line
    return next();
  }
  console.log('Access denied: User details:', req.session.userId); // Debugging line
  res.status(403).json({ message: 'Access forbidden: Admins only' });
};

// Passport middleware to authenticate the session
const passportMiddleware = (req, res, next) => {
  passport.authenticate('session', (err, user) => {
    if (err) return next(err);
    if (!user) return res.redirect('/login');
    req.user = user;
    next();
  })(req, res, next);
};

const setUserLocals = (req, res, next) => {
  res.locals.user = req.session.userId ? { _id: req.session.userId, username: req.session.username } : null;
  next();
};

module.exports = { isAuthenticated, isAdmin, passportMiddleware, setUserLocals  };
