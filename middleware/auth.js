const passport = require('passport');

const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }
  res.redirect('/login');
};

const isAdmin = (req, res, next) => {
  try {
    if (req.session && req.session.userId === '665dc07a683063bb39ecd00c') {
      return next();
    }
    const err = new Error('Sorry, this area is restricted to administrators only');
    err.status = 404;
    return next(err);
  } catch (error) {
  next(error);
}
}

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

module.exports = { isAuthenticated, isAdmin, passportMiddleware, setUserLocals };
