const isAdmin = (req, res, next) => {
    // Check if the user is authenticated and has the admin role
    if (req.session && req.session.userId === '665dc07a683063bb39ecd00c') {
        console.log('Admin access granted:', req.session.userId); // Debugging line
        return next();
    }
    console.log('Access denied: User details:', req.session.userId); // Debugging line
    res.status(403).json({ message: 'Access forbidden: Admins only' });
};
