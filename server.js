require('dotenv').config({ path: 'config/.env.local' });

const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const userRoute = require('./routes/userRoutes');
const bookRoute = require('./routes/booksRoutes');
const orderRoute = require('./routes/orderRoutes');
const cors = require('cors');
const passport = require('passport');
const { setUserLocals } = require('./middleware/auth');

const init = async () => {
    mongoose.connect(process.env.DB_CONNECTION_STRING_db, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    
    const app = express();
    app.use(express.static('public'));
    
    app.use(cors());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
      }));

    app.use(setUserLocals);
    
    app.use(passport.initialize());
    app.use(passport.session());    

    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');
    
    app.use(userRoute);
    app.use(bookRoute);
    app.use(orderRoute);
    
    const port = process.env.PORT || 3000;
    return app.listen(port, () => {
        console.log(`Server is running on port ${port} all set-up`);
    });
};

// starts all
init();
